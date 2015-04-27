var VSHADER_SOURCE ='\
    attribute vec4 a_Position;\n\
    attribute vec2 a_TexCoord;\n\
    varying vec2 v_TexCoord;\n\
    void main(){\n\
        gl_Position = a_Position;\n\
        v_TexCoord = a_TexCoord;\n\
    }\n\
';

var FSHADER_SOURCE = '\n\
    precision mediump float;\n\
    uniform sampler2D u_Sampler;\n\
    varying vec2 v_TexCoord;\n\
    void main(){\n\
        gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n\
    }\n\
';

initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.clearColor(0.0, 0.0, 0.5, 1.0);
var n = 4;

function initVertexBuffers(){
    var vertices = new Float32Array([
        -.5, 0.5, 0.0, 1.0,
        -.5, -.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -.5, 1.0, 0.0,
    ]);

    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var FSIZE = vertices.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*4, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_TexCoord = gl.getAttribLocation(gl.program, "a_TexCoord");
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE*4, FSIZE*2);
    gl.enableVertexAttribArray(a_TexCoord);
}

function loadTexture(image){
    var texture = gl.createTexture();
    var u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 0);
}

initVertexBuffers();
var img = new Image();
img.onload = function(){
    loadTexture(img);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
img.src = "./res/head.png";