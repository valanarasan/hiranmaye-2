import { useEffect, useState } from 'react';

interface DeviceMemoryNavigator extends Navigator {
  deviceMemory?: number;
}

function detect(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return false;

    const nav = navigator as DeviceMemoryNavigator;
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) return false;
    if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * Returns null while undecided so the caller can render the static fallback on
 * the first paint and never flash an empty canvas.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => setSupported(detect()), []);
  return supported;
}
