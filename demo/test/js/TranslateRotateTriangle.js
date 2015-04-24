var VSHADER_SOURCE ='\
    attribute vec4 a_Position;\
    uniform vec4 u_Transition;\
    uniform vec2 u_Rotation;\
    void main(){\
        gl_Position = a_Position;\
        float x = u_Rotation.y*gl_Position.x - u_Rotation.x*gl_Position.y;\
        float y = u_Rotation.x*gl_Position.x + u_Rotation.y*gl_Position.y;\
        gl_Position.x = x;\
        gl_Position.y = y;\
        gl_Position = gl_Position + u_Transition;\
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

var u_Transition = gl.getUniformLocation(gl.program, "u_Transition");
gl.uniform4f(u_Transition, pos.x, pos.y, 0, 0);

rotation = rotation*Math.PI/180;
var u_Rotation = gl.getUniformLocation(gl.program, "u_Rotation");
gl.uniform2f(u_Rotation, Math.sin(rotation), Math.cos(rotation));

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