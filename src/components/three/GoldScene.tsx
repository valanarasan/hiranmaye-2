import { Canvas } from '@react-three/fiber';
import type { SceneConfig } from '@/content/scene';
import { CameraRig } from './CameraRig';
import { FrameGovernor } from './FrameGovernor';
import { LiquidGold } from './LiquidGold';

export interface GoldSceneProps {
  config: SceneConfig;
  /** When false the render loop stops entirely — no GPU work off-screen. */
  active?: boolean;
}

/**
 * Default export so it can be code-split: nothing else in the app imports
 * `three`, which keeps the WebGL payload out of the initial bundle.
 */
export default function GoldScene({ config, active = true }: GoldSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 40 }}
      style={{ pointerEvents: 'none' }}
      frameloop={active ? 'always' : 'never'}
    >
      <CameraRig amount={0.3} />
      <LiquidGold config={config} />
      <FrameGovernor maxDpr={1.6} />
    </Canvas>
  );
}
