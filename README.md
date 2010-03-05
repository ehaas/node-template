# template.node.js

A templating system for [node.js](http://nodejs.org) based on 
John Resig's [JavaScript Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/).

## Templates

Templates are just files with special <% %> tags (like PHP or Ruby tags) which will be replaced with passed-in data. 
Templates can also contain javascript code to be expanded.

### Example Template
    <html>
    <body>
     Hello, <%=name>.
    </body>
    </html>

### Example Template with javascript
    <html>
    <body>
    <% for (var i = 0; i < arr.length; i++) { %>
        The value of arr[<%=i%>] is <%=arr[i]%> <br/>
    <% } %>
    </body>
    </html>

## Usage

There are plenty of ways to use this:

### Simple Usage with a String
    sys.puts(template.create("Hello <%=word%>!", {word:"world"}));
    
### Save the Template for Later
    var t = template.create("Hello <%=word%>!");
    sys.puts(t({word:"planet"}));
    
### Callbacks
    template.create("Hello <%=word%>!", {word:kitty"}, function(t) {
        sys.puts(t);
    });

## Todo

* Callbacks with non-processed templates. 
    
## Other Info

Templates are cached after the first read from disk. This means that if you change a template file, 
you will need to restart the node app to see the change take effect.
