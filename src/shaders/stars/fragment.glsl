varying vec2 vUv;
uniform float uTime;

vec3 hash(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(in vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)), dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x), mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)), dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y), mix(mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)), dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x), mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)), dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
}

void main() {
    vec2 uv = vUv;
    vec3 stars_direction = normalize(vec3(uv * 2.0 - 1.0, 1.0)); // could be view vector for example

    // Reduced threshold for visibility of stars and exposure
    float stars_threshold = 3.0; // Modify to adjust star density
    float stars_exposure = 150.0; // Modify to adjust overall brightness
    float stars = pow(clamp(noise(stars_direction * 100.0), 0.0, 1.0), stars_threshold) * stars_exposure;

    // Time-based flickering effect
    float flickerAmount = 0.5 + 0.5 * sin(uTime);  // Flicker with a sine wave, adjust frequency (5.0) for desired flicker speed
    stars *= mix(0.4, 1.4, flickerAmount);  // Apply flicker effect to the star brightness

    // Output to screen, using the stars variable as the color value
    gl_FragColor = vec4(vec3(stars), 1.0);
}
