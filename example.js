/*
 * This is an example webserver which uses templates to serve pages.
 * It requires the "nerve" module to parse/route the URI requests:
 * http://github.com/gjritter/nerve
 *
 * For example, run the server and visit:
 * http://127.0.0.1:8009/hello/Chad
 * http://127.0.0.1:8009/hi/Bob
 */

var sys = require("sys"),
    nerve = require("./nerve"), /* or path to nerve module */
    get = nerve.get,
    tmpl = require("./template");

var app = [
    [get(/^\/hello\/(\w+)$/),
     function(req, res, name) {
		sys.puts(name);
		var hello_template = tmpl.create('tmpls/hello.template', function(template_function) {
							    res.respond(template_function({name:name}));
		});
     }],
    [get(/^\/hi\/(\w+)$/),
     function(req, res) {
		var hi_template = tmpl.create('tmpls/home.template', function(template_function) {
							    res.respond(template_function({}));
		});
     }]
];

nerve.create(app).listen(8000);