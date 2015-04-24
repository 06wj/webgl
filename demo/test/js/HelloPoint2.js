var VSHADER_SOURCE ='\
    attribute vec4 a_Position;\
    attribute float a_Size;\
    void main(){\
        gl_Position = a_Position;\
        gl_PointSize = a_Size;\
    }\
';

var FSHADER_SOURCE = '\
    void main(){\
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\
    }\
';

initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.clearColor(0.0, 0.5, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

var a_Position = gl.getAttribLocation(gl.program, "a_Position");
gl.vertexAttrib3f(a_Position, 0, 0, 0);

var a_Size = gl.getAttribLocation(gl.program, "a_Size");
gl.vertexAttrib1fv(a_Size, new Float32Array([100.0]));

gl.drawArrays(gl.POINTS, 0, 1);


