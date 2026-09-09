/**
 * Fragmentation → Coherence.
 *
 * Glass, shaded against a procedural studio. There is no HDR file to download:
 * the environment is generated in the shader — a bright ceiling, a soft floor,
 * one crisp horizon and a warm strip light — and each shard both reflects it
 * and refracts it, with the three colour channels bent at slightly different
 * indices so the edges break into faint dispersion.
 *
 * Against a white page the transmitted image is nearly white, so almost all the
 * legibility comes from the edges: Fresnel drives both the reflection mix and
 * the opacity, which is what makes a shard read as light rather than as a heavy
 * object sitting on the page.
 */
export const glassVertexShader = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vViewW;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewW = cameraPosition - world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const glassFragmentShader = /* glsl */ `
precision highp float;

uniform vec3  uTint;
uniform vec3  uRim;
uniform float uOpacity;
uniform float uCoherence;

varying vec3 vNormalW;
varying vec3 vViewW;

vec3 studio(vec3 dir) {
  float y = dir.y;

  // Glass on a white page only reads if the environment has real tonal range:
  // a genuinely dark floor gives every downward-bent ray something to carry,
  // and that is what draws the facets. A high-key room would return white on
  // white and the shards would disappear.
  vec3 col = mix(vec3(0.055, 0.075, 0.115), vec3(0.86, 0.89, 0.94),
                 smoothstep(-0.16, 0.03, y));
  col = mix(col, vec3(1.25), smoothstep(0.42, 0.95, y));

  // strip softbox above
  float strip = smoothstep(0.22, 0.05, abs(y - 0.36));
  col += vec3(1.0, 0.99, 0.96) * strip * 0.45;

  // the brand gold, laid in as a horizon band for the glass to catch
  float band = smoothstep(0.10, 0.0, abs(y + 0.05));
  col += vec3(0.86, 0.62, 0.15) * band * 1.05;

  // a second, cooler band below it — separation between gold and floor
  float navy = smoothstep(0.09, 0.0, abs(y + 0.20));
  col += vec3(0.10, 0.17, 0.30) * navy * 0.9;

  // key
  float key = pow(max(dot(dir, normalize(vec3(0.48, 0.72, 0.50))), 0.0), 30.0);
  col += vec3(1.0) * key * 2.0;

  // cool counter-light, so shards separate from the page on the shadow side
  float fill = pow(max(dot(dir, normalize(vec3(-0.72, 0.20, -0.60))), 0.0), 9.0);
  col += vec3(0.42, 0.56, 0.86) * fill * 0.75;

  return col;
}

void main() {
  vec3 n = normalize(vNormalW);
  vec3 v = normalize(vViewW);
  if (!gl_FrontFacing) n = -n;

  float facing = clamp(dot(n, v), 0.0, 1.0);
  float fres = pow(1.0 - facing, 2.4);

  // dispersion: each channel bends at its own index
  vec3 rR = refract(-v, n, 0.660);
  vec3 rG = refract(-v, n, 0.645);
  vec3 rB = refract(-v, n, 0.630);
  vec3 through = vec3(studio(rR).r, studio(rG).g, studio(rB).b);

  vec3 spec = studio(reflect(-v, n));

  vec3 color = mix(through, spec, clamp(fres * 1.15, 0.0, 1.0));

  // Beer–Lambert: the longer the path through the glass, the more it absorbs.
  // Edge-on facets go cool and deep, face-on facets stay clear — the tonal
  // difference is what gives a colourless shard its form.
  float path = mix(1.45, 0.30, facing);
  color *= exp(-path * (vec3(1.0) - uTint) * 2.4);

  // the lit edge
  color += uRim * pow(fres, 3.0) * 1.35;

  // a tight highlight so facets stay readable while the cluster drifts
  float glint = pow(max(dot(reflect(-v, n), normalize(vec3(0.48, 0.72, 0.50))), 0.0), 140.0);
  color += vec3(1.0) * glint * 1.2;

  // Scattered glass is thin; as the form locks it gains body, so the resolved
  // object reads as one solid rather than forty overlapping panes.
  float alpha = mix(0.28, 0.97, fres) * uOpacity * mix(0.90, 1.15, uCoherence);

  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  #include <colorspace_fragment>
}
`;
