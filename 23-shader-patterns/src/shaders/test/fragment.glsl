varying vec2 vUv;


float random(vec2 st) 
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    // //Pattern 1 - BG test shader
    // gl_FragColor = vec4(uVu, 1.0, 1.0)

    // //Pattern 2 - RG test shader
    // gl_FragColor = vec4(uVu, 0.0, 1.0)

    // //Pattern 3 - gradient (left-right)
    // float strength = vUv.x;

    // //Pattern 4 - gradient (bottom-up)
    // float strength = vUv.y;

    // //Pattern 5 - gradient (top-down)
    // float strength = 1.0 - vUv.y;

    // //Pattern 6 - gradient on first step
    // float strength = vUv.y * 10;

    // //Pattern 7 - gradient with step limit of 1
    // float strength = mod(vUv.y * 10.0, 1.0);

    // //Pattern 8 - evenly spaced black/white horizontal lines
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);

    // //Pattern 9 - Horizontal lines
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // //Pattern 10 - Vertical lines
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);

    // //Pattern 11 - Checkered (Concatenate Patterns 9 + 10)
    // float strength  = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    
    // //Pattern 12 - Dot matrix (Dot product of Pattern 11)
    // float strength  = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    
    // //Pattern 13 - Longer Horizontal Dot matrix (Dot product of Pattern 11)
    // float strength  = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    
    // //Pattern 14 - Right edge matrix (concatentate two Bar values)
    // float barX  = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // float barY  = step(0.8, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = barX + barY;
    
    // //Pattern 15 - Quest 2 Guardian barrier
    // float barX  = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    // float barY  = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = barX + barY;

    // //Pattern 16 - verticle middle gradient
    // float strength = abs(vUv.x - 0.5);

    // //Pattern 17 - cross middle gradient
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // //Pattern 18 - Opposite of cross middle gradient
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // //Pattern 19 - square in a square
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // //Pattern 20 - largersquare in a square
    // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float strength = square1 * square2;

    // //Pattern 21 - Segmented vertical gradient
    // float strength = floor(vUv.x * 10.0) / 10.0;

    // //Pattern 22 - Segmented square gradient
    // float strength = floor(vUv.x * 10.0) / 10.0;
    // strength *= floor(vUv.y * 10.0) / 10.0;

    // //Pattern 23 - Random dots (function for randomness above main() )
    // float strength = random(vUv);

    // //Pattern 24 - Random bigger dots 
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0,
    //     floor(vUv.y * 10.0) / 10.0
    // );
    // float strength = random(gridUv);

    //Pattern 25 - Offset Random bigger dots 
    vec2 gridUv = vec2(
        floor(vUv.x * 10.0) / 10.0,
        floor((vUv.y + vUv.x) * 10.0 ) / 10.0
    );
    float strength = random(gridUv);


    gl_FragColor = vec4(strength, strength, strength, 1.0);
}