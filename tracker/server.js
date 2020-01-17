let http_module = require("http");
const port = 8080;

let track_id_inc = 1;

const pixel = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;
 
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
 
    return list;
}

function parseQuery(request) {
  let q = request.url.split('?'),result={};
  if(q.length>=2){
      q[1].split('&').forEach((item)=>{
           try {
             result[item.split('=')[0]]=item.split('=')[1];
           } catch (e) {
             result[item.split('=')[0]]='';
           }
      })
  }
  return result;
}

function showPixel(request, response) {
    let cookies = parseCookies(request);
    let query = parseQuery(request);
    
    let headers = {
        'Content-Type': 'image/gif',
        'Content-Length': pixel.length
    };
    
    response.writeHead(200, headers);
    response.end(pixel);
    
    if (cookies.track_id && query.url) {
        console.log("tracking: t_id " + cookies.track_id + ", url "  + query.url);
    }
}

function getHTML() {
    s = '\
    <!doctype html>\
<html>\
    <head>\
        <meta charset="utf-8"/>\
    </head>\
    <body>\
        <img src="./pixel?url=abc.com">\
        <h1>HELLO</h1>\
    </body>\
</html>\
    ';
    return s;
}

function general(request, response) {
    let cookies = parseCookies(request);
    let page = getHTML();
    
    let headers = {
        'Content-Type': 'text/html',
        'Content-Length': page.length
    };
    
    if (!cookies.track_id) {
        headers['Set-Cookie'] = 'track_id=' + track_id_inc;
        track_id_inc += 1;
    }
    
    response.writeHead(200, headers);
    response.end(page);
    
}

function handleRequest(request, response) {
    if (request.url.indexOf('/pixel') != -1) {
        showPixel(request, response);
    } else {
        general(request, response);
    }
}

function onListen() {
    console.log("Server is listening");
}

http_module.createServer(handleRequest).listen(port, onListen);
