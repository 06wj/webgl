var VSHADER_SOURCE ='\
    attribute vec4 a_Position;\
    void main(){\
        gl_Position = a_Position;\
        gl_PointSize = 10.0;\
    }\
';

var FSHADER_SOURCE = '\
    void main(){\
        gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0);\
    }\
';

initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.clearColor(0.0, 0.0, 0.5, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

var a_Position = gl.getAttribLocation(gl.program, "a_Position");

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
var vertices = new Float32Array([
    0, .5, -.5, -.5, .5, -.5
]);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);
gl.drawArrays(gl.POINTS, 0, 3);