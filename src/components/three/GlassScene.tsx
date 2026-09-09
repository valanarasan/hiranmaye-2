import { Canvas } from '@react-three/fiber';
import type { SceneConfig } from '@/content/scene';
import { CameraRig } from './CameraRig';
import { FrameGovernor } from './FrameGovernor';
import { ShardField } from './ShardField';

export interface GlassSceneProps {
  config: SceneConfig;
  /** When false the render loop stops entirely — no GPU work off-screen. */
  active?: boolean;
}

/**
 * Default export so it can be code-split: nothing else in the app imports
 * `three`, which keeps the WebGL payload out of the initial bundle.
 */
export default function GlassScene({ config, active = true }: GlassSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.9]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.2], fov: 42, near: 0.1, far: 40 }}
      style={{ pointerEvents: 'none' }}
      frameloop={active ? 'always' : 'never'}
    >
      <CameraRig amount={0.26} />
      <ShardField config={config} />
      <FrameGovernor maxDpr={1.9} minDpr={1} />
    </Canvas>
  );
}
