var VSHADER_SOURCE ='\
    attribute vec4 a_Position;\
    uniform mat4 u_matrix;\
    void main(){\
        gl_Position = u_matrix * a_Position;\
        gl_PointSize = 1.0;\
    }\
';

var FSHADER_SOURCE = '\
    void main(){\
        gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0);\
    }\
';

var rotation = 45;
var pos = {x:-.4, y:.4};

initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.clearColor(0.0, 0.0, 0.5, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


var matrix = new Matrix4();
matrix.rotate(rotation, 0, 0, 1);
matrix.translate(pos.x, pos.y, 0);

var u_matrix = gl.getUniformLocation(gl.program, "u_matrix");
gl.uniformMatrix4fv(u_matrix, false, matrix.elements);

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
var vertices = new Float32Array([
    0, .8, -.3, -.8, .3, -.8
]);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

var a_Position = gl.getAttribLocation(gl.program, "a_Position");
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);
gl.drawArrays(gl.TRIANGLES, 0, 3);