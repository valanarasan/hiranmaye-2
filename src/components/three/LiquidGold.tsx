import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneConfig } from '@/content/scene';
import { damp } from '@/lib/clamp';
import { usePointer, useScrollProgress } from '@/hooks';
import { liquidGoldFragmentShader, liquidGoldVertexShader } from './shaders/liquidGold';

export interface LiquidGoldProps {
  config: SceneConfig;
}

/**
 * Owns exactly one thing: the liquid body. Every dimension, force and colour
 * arrives through `config`; nothing here is a hard-coded constant.
 *
 * The plane is only a canvas for the raymarch — rays are cast from the real
 * camera through each fragment, so the blob is genuinely three-dimensional
 * even though a single quad is drawn.
 */
export function LiquidGold({ config }: LiquidGoldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const pointer = usePointer();
  const { progressRef } = useScrollProgress(900);

  const smoothed = useRef({ progress: 0, x: 0, y: 0, amount: 0 });
  const compact = size.width < 860;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPointer: { value: new THREE.Vector3(99, 99, 99) },
      uPointerAmount: { value: 0 },
      uCenter: { value: new THREE.Vector3() },
      uRadius: { value: 0.5 },
      uViscosity: { value: 0.3 },
      uDentRadius: { value: 0.5 },
      uGold: { value: new THREE.Color(config.colors.gold) },
      uSheen: { value: new THREE.Color(config.colors.sheen) },
      uPixel: { value: 0.002 },
      uSteps: { value: config.steps },
    }),
    [config],
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const dt = Math.min(delta, 1 / 30);
    const u = material.uniforms;

    u.uTime.value += dt;
    u.uSteps.value = compact ? Math.round(config.steps * 0.72) : config.steps;

    // Angular size of one pixel — drives the antialiased silhouette.
    const camera = state.camera as THREE.PerspectiveCamera;
    u.uPixel.value =
      (2 * Math.tan((camera.fov * Math.PI) / 360)) / (size.height * state.gl.getPixelRatio());

    smoothed.current.progress = damp(smoothed.current.progress, progressRef.current, 3.4, dt);
    u.uProgress.value = smoothed.current.progress;

    // The body sits right of centre on desktop so the headline keeps its space.
    const offsetX = compact ? 0 : viewport.width * config.offsetX;
    const offsetY = compact ? viewport.height * config.offsetYCompact : viewport.height * config.offsetY;
    // The body is sized from the viewport, so it holds the same share of the
    // screen on a laptop and on a 5K display.
    const radius = viewport.height * config.radiusRatio * (compact ? 0.82 : 1);
    u.uCenter.value.set(offsetX, offsetY, 0);
    u.uRadius.value = radius;
    u.uViscosity.value = radius * config.viscosity;
    u.uDentRadius.value = radius * config.dentRadius;

    // Pointer, projected onto the blob's plane, with a relaxing dent.
    const active = pointer.current.active;
    const targetX = (pointer.current.x * viewport.width) / 2;
    const targetY = (pointer.current.y * viewport.height) / 2;

    smoothed.current.x = damp(smoothed.current.x, targetX, 9, dt);
    smoothed.current.y = damp(smoothed.current.y, targetY, 9, dt);
    smoothed.current.amount = damp(smoothed.current.amount, active ? 1 : 0, 3, dt);

    u.uPointer.value.set(smoothed.current.x, smoothed.current.y, radius * config.dentDepth);
    u.uPointerAmount.value = smoothed.current.amount;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={liquidGoldVertexShader}
        fragmentShader={liquidGoldFragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
