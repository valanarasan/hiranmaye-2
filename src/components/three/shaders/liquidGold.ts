/**
 * Liquid Gold.
 *
 * A raymarched signed-distance field: several spheres orbiting on different
 * frequencies, joined with a smooth minimum so the surface reads as one liquid
 * body that never repeats. The pointer subtracts a soft sphere — a dent that
 * relaxes out over about a second.
 *
 * Shading is a procedural studio: there is no HDR file to download, so the
 * environment is generated in the shader (a white ceiling, a soft floor, one
 * key softbox and one cool rim) and tinted by the brand gold. The blob is the
 * only thing drawn; every ray that misses is discarded so the white page shows
 * through.
 */
export const liquidGoldVertexShader = /* glsl */ `
varying vec3 vWorldPos;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const liquidGoldFragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uProgress;
uniform vec3  uPointer;
uniform float uPointerAmount;
uniform vec3  uCenter;
uniform float uRadius;
uniform float uViscosity;
uniform float uDentRadius;
uniform vec3  uGold;
uniform vec3  uSheen;
uniform float uPixel;
uniform int   uSteps;

varying vec3 vWorldPos;

/* ---------- distance primitives ------------------------------------------ */

float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float smax(float a, float b, float k) {
  return -smin(-a, -b, k);
}

/* ---------- the body ------------------------------------------------------ */

float map(vec3 world) {
  vec3 p = world - uCenter;

  // A slow rotation on scroll so the form answers the page.
  float a = uProgress * 1.5;
  float c = cos(a);
  float s = sin(a);
  p.xz = mat2(c, -s, s, c) * p.xz;

  float t = uTime * 0.24;
  float k = uViscosity;
  float R = uRadius;

  // Orbit amplitudes are expressed in radii, so the whole body scales as one.
  float d = sdSphere(p - vec3(sin(t * 0.90), cos(t * 0.70), sin(t * 0.50)) * R * 0.34, R * 0.92);
  d = smin(d, sdSphere(p - R * vec3(cos(t * 0.62) * 0.70, sin(t * 1.05) * 0.50, cos(t * 0.80) * 0.40),
                       R * 0.74), k);
  d = smin(d, sdSphere(p - R * vec3(sin(t * 1.27) * 0.56, cos(t * 0.53) * 0.70, sin(t * 0.91) * 0.50),
                       R * 0.66), k);
  d = smin(d, sdSphere(p - R * vec3(cos(t * 0.83) * 0.50, sin(t * 0.66) * 0.58, cos(t * 1.18) * 0.56),
                       R * 0.58), k);
  d = smin(d, sdSphere(p - R * vec3(sin(t * 0.47) * 0.74, cos(t * 0.94) * 0.40, sin(t * 0.61) * 0.34),
                       R * 0.50), k * 0.82);

  // the pointer's dent
  float dent = sdSphere(world - uPointer, uDentRadius);
  d = smax(d, -dent, 0.45 * uPointerAmount + 0.001);

  return d;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.0016, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

/* ---------- procedural studio -------------------------------------------- */

vec3 studio(vec3 dir) {
  float y = dir.y;

  // A hard-ish horizon is what makes a surface read as polished metal rather
  // than plastic: dark ground below, bright room above, one crisp division.
  vec3 col = mix(vec3(0.30, 0.27, 0.24), vec3(0.93, 0.94, 0.96),
                 smoothstep(-0.09, 0.07, y));

  // bright ceiling
  col = mix(col, vec3(1.55), smoothstep(0.52, 0.96, y));

  // a horizontal strip light, the classic studio softbox
  float strip = smoothstep(0.20, 0.06, abs(y - 0.30));
  col += vec3(1.0, 0.98, 0.94) * strip * 0.55;

  // a fill card below — what stops the underside going to mud
  float lift = smoothstep(0.26, 0.04, abs(y + 0.30));
  col += vec3(1.0, 0.93, 0.80) * lift * 0.70;

  // key light, upper right
  float key = pow(max(dot(dir, normalize(vec3(0.52, 0.70, 0.45))), 0.0), 26.0);
  col += vec3(1.0, 0.99, 0.97) * key * 2.4;

  // cool rim from behind left, to separate the body from the white page
  float fill = pow(max(dot(dir, normalize(vec3(-0.75, 0.16, -0.55))), 0.0), 10.0);
  col += vec3(0.70, 0.80, 1.0) * fill * 0.5;

  // warm bounce off the imaginary table
  float bounce = pow(max(-y, 0.0), 4.0);
  col += vec3(1.0, 0.88, 0.66) * bounce * 0.42;

  return col;
}

/* ---------- bounding sphere so misses cost almost nothing ----------------- */

bool hitBounds(vec3 ro, vec3 rd, float radius, out float tNear, out float tFar) {
  vec3 oc = ro - uCenter;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - radius * radius;
  float h = b * b - c;
  if (h < 0.0) return false;
  h = sqrt(h);
  tNear = max(-b - h, 0.0);
  tFar = -b + h;
  return tFar > 0.0;
}

void main() {
  vec3 ro = cameraPosition;
  vec3 rd = normalize(vWorldPos - ro);

  float tNear, tFar;
  float bounds = uRadius * 2.35 + uDentRadius;
  if (!hitBounds(ro, rd, bounds, tNear, tFar)) discard;

  float t = tNear;
  bool hit = false;
  float coverage = 1e9;
  vec3 p = ro + rd * t;
  vec3 pClosest = p;

  for (int i = 0; i < 96; i++) {
    if (i >= uSteps) break;
    p = ro + rd * t;
    float d = map(p);

    // Distance to the surface measured in pixels — gives a free antialiased edge.
    float cone = d / (t * uPixel);
    if (cone < coverage) {
      coverage = cone;
      pClosest = p;
    }

    if (d < 0.0012 * t) {
      hit = true;
      break;
    }
    t += d * 0.92;
    if (t > tFar) break;
  }

  float alpha = hit ? 1.0 : 1.0 - smoothstep(0.0, 1.0, coverage);
  if (alpha <= 0.004) discard;

  vec3 surface = hit ? p : pClosest;
  vec3 n = calcNormal(surface);
  vec3 refl = reflect(rd, n);

  vec3 env = studio(refl);
  float fresnel = pow(1.0 - max(dot(-rd, n), 0.0), 3.2);

  // Metal: no diffuse term, the tint multiplies the reflection.
  vec3 color = env * uGold;
  color += uSheen * fresnel * 0.6;

  // a tight specular so the form always has a highlight to read the curve by
  float spec = pow(max(dot(refl, normalize(vec3(0.5, 0.78, 0.38))), 0.0), 90.0);
  color += vec3(1.0) * spec * 1.4;

  gl_FragColor = vec4(color, alpha);
  #include <colorspace_fragment>
}
`;
