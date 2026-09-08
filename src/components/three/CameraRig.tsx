import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { damp } from '@/lib/clamp';
import { usePointer } from '@/hooks';

export interface CameraRigProps {
  /** How far the camera drifts, in world units. */
  amount?: number;
}

/** Parallax only. It knows nothing about what is being looked at. */
export function CameraRig({ amount = 0.42 }: CameraRigProps) {
  const pointer = usePointer();
  const current = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const targetX = pointer.current.active ? pointer.current.x * amount : 0;
    const targetY = pointer.current.active ? pointer.current.y * amount * 0.55 : 0;

    current.current.x = damp(current.current.x, targetX, 2.4, dt);
    current.current.y = damp(current.current.y, targetY, 2.4, dt);

    state.camera.position.x = current.current.x;
    state.camera.position.y = current.current.y;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
