    precision mediump float;

    varying float vRandom;

    void main()
    {
        gl_FragColor = vec4(vRandom *  0.5,vRandom *  0.7, 0.2, 1.0);
    }