'use strict'

function bin2hex(s){    
    let i, a = [];
    
    for (i = 0; i < s.length; i++) {  
        a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");  
    }
    
    return a.join('');  
}

function getSimpleDirectives() {
    let res = navigator.language + screen.colorDepth;
    res += new Date().getTimezoneOffset();
    return res;
}

function getGPUVendor() {
    let canvas = document.createElement('canvas');
    let gl, debugInfo, vendor, renderer;
    
    try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        
        return vendor + " " + renderer;
    } catch (e) {}

    return ''
}

function getCanvasData() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let txt = "#!abacaba\nsome_good+text;$:)";
    
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(0, 0, 150, 150);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);

    let b64 = canvas.toDataURL();
    let bin = atob(b64.replace("data:image/png;base64,", ""));
    return bin2hex(bin.slice(-16,-12));
}

function init() {
    let data = ''
    let hash = ''
    
    try {
        data += getGPUVendor();
        data += getSimpleDirectives();
        data += getCanvasData();
    } catch (e) {
        console.log(e)
    }
    
    hash = murmurhash2_32_gc(data, 123123);
    document.cookie = "track_uid=" + hash;
}

setTimeout(init, 1);
