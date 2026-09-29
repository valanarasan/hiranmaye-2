import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { CanvasTexture, Group } from 'three';
import type { SceneConfig } from '@/content/scene';
import { clamp, damp } from '@/lib/clamp';
import { usePointer } from '@/hooks';
import { cardTexture, posterTexture } from './posterTextures';

export interface HoardingProps {
  config: SceneConfig;
}

const CARD_W = 1.02;
const CARD_H = 0.64;
const RAIL_DEPTH = 0.2;

/**
 * The hoarding: a poster panel on a steel frame, with business cards strung
 * along the lower rail. No shadows anywhere — the site's ground is white, and
 * a cast shadow on white reads as grime rather than depth.
 */
export function Hoarding({ config }: HoardingProps) {
  const rig = useRef<Group>(null);
  const cards = useRef<Group[]>([]);
  const pointer = usePointer();
  const { viewport } = useThree();

  const poster = useMemo(() => posterTexture(config), [config]);
  const faces = useMemo<CanvasTexture[]>(
    () => config.cards.map((card) => cardTexture(card, config)),
    [config],
  );

  // Canvas textures are not garbage collected with the component.
  useEffect(() => {
    return () => {
      poster.dispose();
      faces.forEach((face) => face.dispose());
    };
  }, [poster, faces]);

  const { width: panelW, height: panelH } = config.panel;
  const railY = -panelH / 2 - 0.1;
  const compact = viewport.aspect < 1;

  // Fit the rig to the viewport rather than to a fixed breakpoint, so it holds
  // its framing at every width instead of snapping between two sizes.
  const scale = clamp(viewport.width / (panelW * (compact ? 1.5 : 2.45)), 0.3, 0.78);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const t = state.clock.elapsedTime;
    const group = rig.current;
    if (!group) return;

    const aimX = pointer.current.active ? pointer.current.x : 0;
    const aimY = pointer.current.active ? pointer.current.y : 0;

    group.rotation.y = damp(
      group.rotation.y,
      aimX * config.follow + Math.sin(t * 0.22) * config.drift,
      2.2,
      dt,
    );
    group.rotation.x = damp(group.rotation.x, -aimY * 0.08, 2.2, dt);

    for (let i = 0; i < cards.current.length; i += 1) {
      const pivot = cards.current[i];
      if (!pivot) continue;
      const phase = i * 0.9;
      const speed = 0.75 + (i % 3) * 0.12;
      pivot.rotation.z = Math.sin(t * speed + phase) * config.sway;
      pivot.rotation.x = Math.sin(t * speed * 0.6 + phase) * config.sway * 0.6;
    }
  });

  return (
    <group
      ref={rig}
      position={[
        viewport.width * (compact ? config.offsetXCompact : config.offsetX),
        viewport.height * (compact ? config.offsetYCompact : config.offsetY),
        0,
      ]}
      scale={scale}
    >
      {/* Poster panel: printed face forward, brand navy on every other side. */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[panelW, panelH, 0.12]} />
        <meshStandardMaterial attach="material-0" color={config.colors.ink} roughness={0.6} />
        <meshStandardMaterial attach="material-1" color={config.colors.ink} roughness={0.6} />
        <meshStandardMaterial attach="material-2" color={config.colors.ink} roughness={0.6} />
        <meshStandardMaterial attach="material-3" color={config.colors.ink} roughness={0.6} />
        <meshBasicMaterial attach="material-4" map={poster} toneMapped={false} />
        <meshStandardMaterial attach="material-5" color="#1a2a44" roughness={0.7} />
      </mesh>

      {/* Frame: a cap rail, two legs and the lower rail the cards hang from. */}
      <mesh position={[0, panelH / 2 + 0.07, 0]}>
        <boxGeometry args={[panelW + 0.5, 0.14, 0.24]} />
        <meshStandardMaterial color={config.colors.ink} roughness={0.45} metalness={0.25} />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (panelW / 2 - 0.55), -panelH / 2 - 1.5, -0.16]}>
          <boxGeometry args={[0.15, 5.4, 0.15]} />
          <meshStandardMaterial color={config.colors.ink} roughness={0.45} metalness={0.25} />
        </mesh>
      ))}

      <mesh position={[0, railY, 0.12]}>
        <boxGeometry args={[panelW + 0.5, 0.1, 0.18]} />
        <meshStandardMaterial color={config.colors.ink} roughness={0.45} metalness={0.25} />
      </mesh>

      {config.cards.map((card, index) => {
        const x = (index - (config.cards.length - 1) / 2) * 1.2;
        const drop = config.cardDrops[index % config.cardDrops.length] ?? 0.72;

        return (
          <group
            key={card.id}
            position={[x, railY - 0.05, RAIL_DEPTH]}
            ref={(node) => {
              if (node) cards.current[index] = node;
            }}
          >
            {/* The string. Two points is enough: it never bends. */}
            <mesh position={[0, -(drop - CARD_H / 2) / 2, 0]}>
              <boxGeometry args={[0.012, drop - CARD_H / 2, 0.012]} />
              <meshBasicMaterial color={config.colors.hairline} />
            </mesh>

            <mesh position={[0, -drop, 0]}>
              <boxGeometry args={[CARD_W, CARD_H, 0.02]} />
              <meshStandardMaterial
                attach="material-0"
                color={card.accent ? config.colors.accent : config.colors.ink}
                roughness={0.6}
              />
              <meshStandardMaterial
                attach="material-1"
                color={card.accent ? config.colors.accent : config.colors.ink}
                roughness={0.6}
              />
              <meshStandardMaterial
                attach="material-2"
                color={card.accent ? config.colors.accent : config.colors.ink}
                roughness={0.6}
              />
              <meshStandardMaterial
                attach="material-3"
                color={card.accent ? config.colors.accent : config.colors.ink}
                roughness={0.6}
              />
              <meshBasicMaterial attach="material-4" map={faces[index]} toneMapped={false} />
              <meshStandardMaterial
                attach="material-5"
                color={card.accent ? config.colors.accent : config.colors.ink}
                roughness={0.6}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
