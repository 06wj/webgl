var VSHADER_SOURCE ='\
    void main(){\
        gl_Position = vec4(-0.5, 0.5, 0.0, 1);\
        gl_PointSize = 10.0;\
    }\
';

var FSHADER_SOURCE = '\
    void main(){\
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);\
    }\
';

initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.clearColor(0.0, 0.5, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, 1);


