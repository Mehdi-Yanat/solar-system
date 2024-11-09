varying vec2 vUv;
uniform float uTime;
uniform float uSpeed;

void main() {

    // Set point size (increase for visibility)
    gl_PointSize = 10.0;  // Adjust this value to your desired point size

    // Map position to screen-space UVs
    vec3 worldPosition = position.xyz;  // Assume position is in world coordinates
    vUv = worldPosition.xy;  // Scale and translate position to 0.0 - 1.0 range for UVs

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); 

    // Apply the transformation for the vertex position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize *= (1.0 / -mvPosition.z);

}
