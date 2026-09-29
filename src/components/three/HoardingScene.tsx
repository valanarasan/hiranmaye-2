import { Canvas } from '@react-three/fiber';
import type { SceneConfig } from '@/content/scene';
import { CameraRig } from './CameraRig';
import { FrameGovernor } from './FrameGovernor';
import { Hoarding } from './Hoarding';

export interface HoardingSceneProps {
  config: SceneConfig;
  /** When false the render loop stops entirely — no GPU work off-screen. */
  active?: boolean;
}

/**
 * Default export so it can be code-split: nothing else in the app imports
 * `three`, which keeps the WebGL payload out of the initial bundle.
 *
 * Shadows are deliberately off. `shadowMap` stays disabled, so the scene costs
 * one pass rather than two.
 */
export default function HoardingScene({ config, active = true }: HoardingSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.9]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 11], fov: 40, near: 0.1, far: 60 }}
      style={{ pointerEvents: 'none' }}
      frameloop={active ? 'always' : 'never'}
      shadows={false}
    >
      <hemisphereLight args={['#ffffff', '#d9dee8', 0.95]} />
      <directionalLight position={[3.4, 5.2, 4.2]} intensity={0.85} />
      <directionalLight position={[-4, 1.5, 2.5]} intensity={0.3} color="#dfe6f2" />

      <CameraRig amount={0.3} />
      <Hoarding config={config} />
      <FrameGovernor maxDpr={1.9} minDpr={1} />
    </Canvas>
  );
}
