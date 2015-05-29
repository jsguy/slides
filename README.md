# Slides for practical javascript presentations

These are the slides I usually use for presentations in forums - basically an enhanced version of reveal.js
Here are some useful snippets:

Run JavaScript code and also show it syntax highlighted:

```html
<script id="badname25">
    var OBJect = {},
        this_is_my_object = {},
        cFunc = function() {},
        u = new user({
            name: 'Bob Parr'
        });
</script>
<div data-syntaxify="#badname25" data-syntaxify-language="js"></div>
```

Compare code side by side (won't run, as we have text/syntaxify as the type):

```html
<div class="compareJS">
    <div class="compareLeft">
        <script id="badname1" type="text/syntaxify">
            var x = "#foo";
        </script>
        <div data-syntaxify="#badname1" data-syntaxify-language="js"></div>
    </div>
    <div class="compareRight">
        <script id="badname2" type="text/syntaxify">
            var querySelector = "#foo";
        </script>
        <div data-syntaxify="#badname2" data-syntaxify-language="js"></div>
    </div>
</div>
```

Create a annotations for specific lines of code:

```html
<script id="misoTodo1" type="text/syntaxify">
    module.exports.index = {
        controller: function(params) {
            return this;
        },
        view: function(ctrl) {
            return "TODO";
        }
    };
</script>
<div data-syntaxify="#misoTodo1" data-syntaxify-language="javascript"
    data-annotations="2-4`The controller must return 'this'.<br/>We do that, so there is a pointer that miso can interact with to get at the controller|
    6`The view can return HTML or plain text">
</div>
```
