var VSHADER_SOURCE ='\
    attribute vec4 a_Position;\
    attribute float a_PointSize;\
    void main(){\
        gl_Position = a_Position;\
        gl_PointSize = a_PointSize;\
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
var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
var vertices = new Float32Array([
    0, .5, 10.0,
    -.5, -.5, 100,
    .5, -.5, 50
]);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
var FSIZE = vertices.BYTES_PER_ELEMENT;

gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*3, 0);
gl.enableVertexAttribArray(a_Position);

gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE*3, FSIZE*2);
gl.enableVertexAttribArray(a_PointSize);

gl.drawArrays(gl.POINTS, 0, 3);