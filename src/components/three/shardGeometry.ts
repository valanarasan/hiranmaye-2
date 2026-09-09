import * as THREE from 'three';

/**
 * One shard: a faceted crystal built from a jittered belt of vertices between
 * two apexes. Every shard gets its own geometry so no two are the same shape —
 * a cluster of identical pieces reads as a pattern, not as broken glass.
 */
export function createShardGeometry(
  random: () => number,
  width: number,
  height: number,
  depth: number,
): THREE.BufferGeometry {
  const sides = 5 + Math.floor(random() * 2);
  const belt: THREE.Vector3[] = [];

  for (let i = 0; i < sides; i += 1) {
    const angle = (i / sides) * Math.PI * 2 + random() * 0.35;
    const radius = 0.62 + random() * 0.42;
    belt.push(
      new THREE.Vector3(
        Math.cos(angle) * radius * width,
        (random() - 0.5) * 0.18 * height,
        Math.sin(angle) * radius * depth,
      ),
    );
  }

  const top = new THREE.Vector3(
    (random() - 0.5) * 0.2 * width,
    height * (0.52 + random() * 0.3),
    (random() - 0.5) * 0.2 * depth,
  );
  const bottom = new THREE.Vector3(
    (random() - 0.5) * 0.2 * width,
    -height * (0.42 + random() * 0.28),
    (random() - 0.5) * 0.2 * depth,
  );

  const positions: number[] = [];
  const push = (v: THREE.Vector3) => positions.push(v.x, v.y, v.z);

  for (let i = 0; i < sides; i += 1) {
    const a = belt[i]!;
    const b = belt[(i + 1) % sides]!;
    push(a);
    push(b);
    push(top);
    push(b);
    push(a);
    push(bottom);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

/** Deterministic PRNG, so the cluster is the same on every load. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
