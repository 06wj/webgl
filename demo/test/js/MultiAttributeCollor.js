var VSHADER_SOURCE ='\
    attribute vec4 a_Position;\n\
    attribute vec4 a_Color;\n\
    varying vec4 v_color;\n\
    void main(){\n\
        gl_Position = a_Position;\n\
        gl_PointSize = 10.0;\n\
        v_color = a_Color;\n\
    }\n\
';

var FSHADER_SOURCE = '\n\
    precision mediump float;\n\
    varying vec4 v_color;\n\
    void main(){\n\
        gl_FragColor = vec4(1.0, gl_FragCoord.x/400.0, gl_FragCoord.x/400.0, 1.0);\n\
    }\n\
';

initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.clearColor(0.0, 0.0, 0.5, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

var a_Position = gl.getAttribLocation(gl.program, "a_Position");
var a_Color = gl.getAttribLocation(gl.program, "a_Color");

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
var vertices = new Float32Array([
    0, .5, 0, 0, 1, 1,
    -.5, -.5, 1, 0, 0, 1,
    .5, -.5, 0, 1, 0, 1
]);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
var FSIZE = vertices.BYTES_PER_ELEMENT;

gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*6, 0);
gl.enableVertexAttribArray(a_Position);

gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, FSIZE*6, FSIZE*2);
gl.enableVertexAttribArray(a_Color);

gl.drawArrays(gl.POINTS, 0, 3);
gl.drawArrays(gl.TRIANGLES, 0, 3);