/*
 * template.node.js
 * by Chad Etzel - MIT Licensed
 *
 * Based off of:
 * Simple JavaScript Templating
 * by John Resig - http://ejohn.org/ - MIT Licensed
 * http://ejohn.org/blog/javascript-micro-templating/
 */


var fs = require("fs");

var cache = {};
  
var create = function(file_name, callback) {
    fs.readFile(file_name, function(err, data) {
        if(err) throw err;
        callback(new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            "obj=obj||{};" +
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            data.replace(/[\r\n\t]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'") +
        "');}return p.join('');"));
    });
}

/* exports */
exports.create = create;
