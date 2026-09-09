import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneConfig } from '@/content/scene';
import { damp } from '@/lib/clamp';
import { usePointer, useScrollProgress } from '@/hooks';
import { glassFragmentShader, glassVertexShader } from './shaders/glass';
import { createShardGeometry, seededRandom } from './shardGeometry';

export interface ShardFieldProps {
  config: SceneConfig;
}

interface Shard {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  /** Where it floats when nothing is resolved. */
  scatter: THREE.Vector3;
  /** Its seat on the lathe-turned form: a column in a ring, at a height. */
  theta: number;
  profileT: number;
  /** Its own footprint, so it can be scaled to exactly fill that seat. */
  baseWidth: number;
  baseHeight: number;
  /** Idle motion. */
  phase: THREE.Vector3;
  tumbleAxis: THREE.Vector3;
  tumbleRate: number;
  scatterQuat: THREE.Quaternion;
  scale: number;
}

/**
 * The profile of the vessel the shards resolve onto — a solid of revolution
 * with a foot, a bulge and a neck. Returns the radius at height fraction `t`.
 */
function profileRadius(t: number): number {
  const bulge = Math.pow(Math.sin(Math.PI * t), 0.78);
  const neck = 1 - 0.46 * Math.exp(-Math.pow((t - 0.84) / 0.11, 2));
  const foot = 1 - 0.52 * Math.exp(-Math.pow((t - 0.06) / 0.09, 2));
  const lip = 0.2 * Math.exp(-Math.pow((t - 0.98) / 0.045, 2));
  return 0.16 + bulge * neck * foot + lip;
}

/**
 * Shards are laid out in rings rather than scattered over the surface: a
 * solid of revolution only reads as solid if its pieces tile it. Rows are
 * offset like brickwork so no seam runs straight down the form.
 */
function ringLayout(count: number) {
  const rows = Math.max(5, Math.round(Math.sqrt(count * 1.35)));
  const perRow = Math.ceil(count / rows);
  return { rows, perRow };
}

/**
 * Owns exactly one thing: the shard cluster. Every dimension, force and colour
 * arrives through `config`; nothing here is a hard-coded constant.
 */
export function ShardField({ config }: ShardFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const pointer = usePointer();
  const { progressRef } = useScrollProgress(260);

  const smoothed = useRef({ coherence: 0, px: 0, py: 0 });
  const intro = useRef(0);
  const compact = size.width < 860;
  const count = compact ? config.countCompact : config.count;
  const layout = useMemo(() => ringLayout(count), [count]);

  const { group, shards } = useMemo(() => {
    const random = seededRandom(20260908);
    const container = new THREE.Group();
    const built: Shard[] = [];
    const { rows, perRow } = ringLayout(count);

    const tint = new THREE.Color(config.colors.tint);
    const rim = new THREE.Color(config.colors.rim);

    for (let i = 0; i < count; i += 1) {
      const variation = 0.78 + random() * 0.44;
      const baseWidth = config.shard.width * variation;
      const baseHeight = config.shard.height * variation;
      const geometry = createShardGeometry(
        random,
        baseWidth,
        baseHeight,
        config.shard.depth * variation,
      );

      const material = new THREE.ShaderMaterial({
        vertexShader: glassVertexShader,
        fragmentShader: glassFragmentShader,
        uniforms: {
          uTint: { value: tint.clone() },
          uRim: { value: rim.clone() },
          uOpacity: { value: 0.78 + random() * 0.22 },
          uCoherence: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      container.add(mesh);

      const axis = new THREE.Vector3(random() - 0.5, random() - 0.5, random() - 0.5).normalize();

      built.push({
        mesh,
        material,
        scatter: new THREE.Vector3(
          (random() * 2 - 1) * config.scatter.x,
          (random() * 2 - 1) * config.scatter.y,
          (random() * 2 - 1) * config.scatter.z,
        ),
        theta:
          ((i % perRow) / perRow) * Math.PI * 2 +
          (Math.floor(i / perRow) % 2) * (Math.PI / perRow) +
          (random() - 0.5) * 0.16,
        profileT: (Math.floor(i / perRow) + 0.5) / rows,
        baseWidth,
        baseHeight,
        phase: new THREE.Vector3(random() * 6.28, random() * 6.28, random() * 6.28),
        tumbleAxis: axis,
        tumbleRate: (0.5 + random()) * config.tumble,
        scatterQuat: new THREE.Quaternion().setFromEuler(
          new THREE.Euler(random() * 6.28, random() * 6.28, random() * 6.28),
        ),
        scale: 1,
      });
    }

    return { group: container, shards: built };
  }, [count, config]);

  useEffect(
    () => () => {
      shards.forEach((shard) => {
        shard.mesh.geometry.dispose();
        shard.material.dispose();
      });
    },
    [shards],
  );

  // Scratch objects, reused every frame so the loop allocates nothing.
  const scratch = useMemo(
    () => ({
      scatterPos: new THREE.Vector3(),
      coherentPos: new THREE.Vector3(),
      position: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      up: new THREE.Vector3(),
      basis: new THREE.Matrix4(),
      spin: new THREE.Quaternion(),
      scatterQuat: new THREE.Quaternion(),
      coherentQuat: new THREE.Quaternion(),
      quat: new THREE.Quaternion(),
    }),
    [],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const time = state.clock.elapsedTime;
    const s = scratch;

    // The argument has to land before anyone touches anything, so the hero
    // demonstrates itself once on load — scattered, gathering, held, released —
    // and only then hands control to the scroll and the pointer.
    intro.current += dt;
    const introCoherence =
      intro.current < 1.1 ? 0
      : intro.current < 3.4 ? (intro.current - 1.1) / 2.3
      : intro.current < 5.0 ? 1
      : intro.current < 6.6 ? 1 - (intro.current - 5.0) / 1.6
      : 0;

    // After that, scroll drives it, and the pointer pulls the cluster together
    // as it approaches — so the idea is discoverable without scrolling at all.
    const pointerPull = pointer.current.active
      ? 0.9 * Math.max(0, 1 - Math.abs(pointer.current.x - 0.5) * 1.5)
      : 0;

    const target = Math.min(1, Math.max(introCoherence, progressRef.current + pointerPull));
    smoothed.current.coherence = damp(smoothed.current.coherence, target, 3.1, dt);
    const p = smoothed.current.coherence;
    const eased = p * p * (3 - 2 * p);

    const formSpin = time * config.spin * Math.PI * 2;

    for (let i = 0; i < shards.length; i += 1) {
      const shard = shards[i]!;

      // --- scattered: a slow, aimless drift ---------------------------------
      s.scatterPos.set(
        shard.scatter.x + Math.sin(time * 0.21 + shard.phase.x) * config.drift,
        shard.scatter.y + Math.cos(time * 0.17 + shard.phase.y) * config.drift,
        shard.scatter.z + Math.sin(time * 0.13 + shard.phase.z) * config.drift,
      );

      // --- resolved: a seat on the lathe-turned form -------------------------
      const t = shard.profileT;
      const radius = profileRadius(t) * config.form.radius;
      const angle = shard.theta + formSpin;
      const y = (t - 0.5) * config.form.height;

      s.coherentPos.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);

      // Bow the path outward mid-transition so pieces sweep in rather than
      // sliding along a straight line.
      s.position.lerpVectors(s.scatterPos, s.coherentPos, eased);
      const bow = Math.sin(eased * Math.PI) * 0.16;
      s.position.x += Math.cos(angle) * bow;
      s.position.z += Math.sin(angle) * bow;

      shard.mesh.position.copy(s.position);

      // --- orientation -------------------------------------------------------
      s.spin.setFromAxisAngle(shard.tumbleAxis, time * shard.tumbleRate);
      s.scatterQuat.copy(shard.scatterQuat).multiply(s.spin);

      // Lie flat against the surface: thin axis (local Z) along the normal,
      // long axis (local Y) along the profile's tangent.
      const slope = (profileRadius(Math.min(1, t + 0.02)) - profileRadius(Math.max(0, t - 0.02)))
        * config.form.radius;
      s.normal.set(Math.cos(angle), -slope * 1.6, Math.sin(angle)).normalize();
      s.up.set(-Math.cos(angle) * slope, 1, -Math.sin(angle) * slope).normalize();
      s.tangent.crossVectors(s.up, s.normal).normalize();
      s.up.crossVectors(s.normal, s.tangent).normalize();
      s.basis.makeBasis(s.tangent, s.up, s.normal);
      s.coherentQuat.setFromRotationMatrix(s.basis);

      s.quat.copy(s.scatterQuat).slerp(s.coherentQuat, eased);
      shard.mesh.quaternion.copy(s.quat);

      // Grow into the seat as the form locks: each shard is stretched to cover
      // its share of the ring, so the pieces meet instead of dotting a surface.
      const seatWidth = ((2 * Math.PI * radius) / layout.perRow) * 1.28;
      const seatHeight = (config.form.height / layout.rows) * 1.42;
      const kx = Math.min(3.4, Math.max(0.85, seatWidth / shard.baseWidth));
      const ky = Math.min(3.4, Math.max(0.85, seatHeight / shard.baseHeight));
      shard.mesh.scale.set(1 + (kx - 1) * eased, 1 + (ky - 1) * eased, 1 + 0.12 * eased);

      shard.material.uniforms.uCoherence.value = eased;
    }

    // --- placement and parallax --------------------------------------------
    const g = groupRef.current;
    if (g) {
      const fit = Math.min(1.1, Math.max(0.56, viewport.height / 4.9));
      g.scale.setScalar(fit * (compact ? 0.84 : 1));
      g.position.x = compact ? 0 : viewport.width * config.offsetX;
      g.position.y = viewport.height * (compact ? config.offsetYCompact : config.offsetY);

      const targetX = pointer.current.active ? pointer.current.x * 0.14 : 0;
      const targetY = pointer.current.active ? -pointer.current.y * 0.1 : 0;
      smoothed.current.px = damp(smoothed.current.px, targetX, 2.6, dt);
      smoothed.current.py = damp(smoothed.current.py, targetY, 2.6, dt);
      g.rotation.y = smoothed.current.px;
      g.rotation.x = smoothed.current.py;
    }
  });

  return <primitive ref={groupRef} object={group} />;
}
