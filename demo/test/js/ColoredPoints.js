var VSHADER_SOURCE ='\
    attribute vec4 a_Position;\
    attribute float a_Size;\
    void main(){\
        gl_Position = a_Position;\
        gl_PointSize = a_Size;\
    }\
';

var FSHADER_SOURCE = '\
    precision mediump float;\
    uniform vec4 u_FragColor;\
    void main(){\
        gl_FragColor = u_FragColor;\
    }\
';

initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.clearColor(0.0, 0.0, 0.5, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

var a_Position = gl.getAttribLocation(gl.program, "a_Position");
var a_Size = gl.getAttribLocation(gl.program, "a_Size");
gl.vertexAttrib1fv(a_Size, new Float32Array([10.0]));

var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
var gl_points = [];
canvas.onclick = function(e){
    var x = e.clientX - canvasPos.left;
    var y = canvasHeight - e.clientY + canvasPos.top;
    x = x/halfWidth - 1;
    y = y/halfHeight - 1;
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl_points.push({x:x, y:y});
    gl_points.forEach(function(p, index){
        gl.uniform4f(u_FragColor, p.x*.5 + .5, p.y*.5+.5, 0, 1);
        gl.vertexAttrib2f(a_Position, p.x, p.y);
        gl.drawArrays(gl.POINTS, 0, 1);
    });
}


