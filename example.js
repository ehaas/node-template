/*
 * This is an example webserver which uses templates to serve pages.
 * It requires the "nerve" module to parse/route the URI requests:
 * http://github.com/gjritter/nerve
 *
 * For example, run the server and visit:
 * http://127.0.0.1:8009/hi/Bob
 */

var sys = require("sys"),
    nerve = require("./nerve"), /* or path to nerve module */
    get = nerve.get,
    tmpl = require("./template");

var hi_template = tmpl.create("tmpls/hi.template", function(template_function) {
    var app = [
        [get(/^\/hi\/(\w+)$/),
         function(req, res, name) {
            res.respond(template_function({name:name}));
         }]
    ];

    nerve.create(app).serve();
});
