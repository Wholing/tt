var querystring = require("querystring"),
fs = require("fs"),
url = require("url");
//formidable = require("formidable");


function index(response) {
	console.log("Request handler 'index' was called.");
	fs.readFile(__dirname +"/index.htm", "utf8", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(file, "utf8");
			response.end();
		}
	});
}

function javascripts(response, request) {
	var pathname = url.parse(request.url).pathname;
	console.log("Request handler 'javascripts' was called.");
	fs.readFile(__dirname + pathname, "utf8", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(file, "utf8");
			response.end();
		}
	});
}
exports.index = index;
exports.javascripts = javascripts;
