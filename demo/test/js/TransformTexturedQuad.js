var VSHADER_SOURCE ='\
    attribute vec4 a_Position;\n\
    attribute vec2 a_TexCoord;\n\
    uniform mat4 u_Transform;\n\
    varying vec2 v_TexCoord;\n\
    void main(){\n\
        gl_Position = u_Transform * a_Position;\n\
        v_TexCoord = a_TexCoord;\n\
    }\n\
';

var FSHADER_SOURCE = '\n\
    precision mediump float;\n\
    uniform sampler2D u_Sampler;\n\
    varying vec2 v_TexCoord;\n\
    void main(){\n\
        gl_FragColor = texture2D(u_Sampler, v_TexCoord).rgba;\n\
    }\n\
';

gl.disable(gl.DEPTH_TEST);
gl.disable(gl.CULL_FACE);
initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.clearColor(0.0, 0.0, 0.5, 1.0);
var n = 4;

function initVertexBuffers(){
    var width = 128;
    var height = 128;
    var cw = 400;
    var ch = 400;
    var temp = new Float32Array(16);
    function createPos(tx, ty, tw, th, x, y, w, h){
        tw = tw/width;
        th = th/height;
        tx = tx/width;
        ty = ty/height;

        x = x/cw*2 - 1;
        y = y/ch*2 - 1;
        w = w/cw*2;
        h = h/ch*2;

        if(tw + tx > 1){
            tw = 1 - tx;
        }

        if(th + ty > 1){
            th = 1 - ty;
        }

        tx = 1 - tx - tw;
        ty = 1 - ty - th;

        y = y - h;

        x=-1
        y=0

        temp[0] = x; temp[1] = y; temp[2] = tx; temp[3] = ty;
        temp[4] = x+w;temp[5] = y; temp[6] = tx+tw; temp[7] = ty;
        temp[8] = x; temp[9] = y+h; temp[10] = tx;temp[11] = ty+th;
        temp[12] = x+w;temp[13] = y+h;temp[14] = tx+tw;temp[15] = ty+th;

        return temp;
    }

    var vertices = createPos(0, 0, 128, 128, 0, 0, 128, 128);
    console.log(vertices);

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

    var u_Transform = gl.getUniformLocation(gl.program, "u_Transform");
    var matrix = new Matrix4();
    matrix.translate(1.2, .5, 0);
    matrix.rotate(30, 0, 0, 1);
    // matrix.scale(1, .5, 1);

    gl.uniformMatrix4fv(u_Transform, false, matrix.elements);
}

function loadTexture(image){
    var texture = window._texture = gl.createTexture();
    var u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    // gl.uniform1i(u_Sampler, 1);
}

initVertexBuffers();


var imgs = [];
function loadImage(src, needCORS){
    var defer = Promise.defer();
    var img = new Image();
    imgs.push(img);
    if(needCORS){
        img.crossOrigin = "Anonymous";
    }
    img.onload = function(){
        defer.resolve(img);
    };
    img.onerror = function(){
        defer.reject("hia~" + img.src);
    };
    img.src = src;
    return defer.promise;
}


Promise.defer = Promise.defer||function(){
    var _resolve, _reject;
    var promise = new Promise(function(resolve, reject){
        _resolve = function(){
            resolve.apply(window, arguments);
        };
        _reject = function(){
            reject.apply(window, arguments);
        }
    });
    return {
        promise:promise,
        resolve:_resolve,
        reject:_reject
    };
};

Promise.all([
    loadImage("http://gtms02.alicdn.com/tps/i2/TB1k9zyHFXXXXbzXXXXqPjeIFXX-1140-960.png", true),
    loadImage("./res/head.png"),
]).then(function(){
    loadTexture(imgs[0]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    var u_Transform = gl.getUniformLocation(gl.program, "u_Transform");
    var matrix = new Matrix4();
    matrix.setTranslate(1.5, -1, 0);
    matrix.rotate(-10, 0, 0, 1);
    matrix.scale(2, 1, 1);

    gl.uniformMatrix4fv(u_Transform, false, matrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgs[1]);

    matrix.setTranslate(0, .2, 0);
    matrix.rotate(30, 0, 0, 1);
    gl.uniformMatrix4fv(u_Transform, false, matrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}).catch(function(error){
    console.log(error);
})