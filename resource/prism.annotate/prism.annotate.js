/*
    Code annotation plugin for prism

    Example usage (with jquery.syntaxify):

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

    TODO: Example without syntaxify.    

*/
(function(){

if(!window.Prism) {
    return;
}

function $$(expr, con) {
    return Array.prototype.slice.call((con || document).querySelectorAll(expr));
}

function hasClass(element, className) {
  className = " " + className + " ";
  return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1
}

var CRLF = crlf = /\r?\n|\r/g;
    
function annotateLines(pre, lines, classes) {
    var ranges = lines.replace(/\s+/g, '').split(','),
        offset = +pre.getAttribute('data-annotations-offset') || 0,
        allLines = lines.split("|"),
        tmp, range, text;

    offset -= 1;
    
    var lineHeight = parseFloat(getComputedStyle(pre).lineHeight);


    for(var j = 0; j < allLines.length; j += 1) {
        tmp = allLines[j].split("`");
        range = tmp[0];
        text = tmp[1];

        range = range.split('-');

        var start = +range[0],
            end = +range[1] || start;
        
        var line = document.createElement('div');
        
        //  Add line breaks
        line.textContent = Array(end - start + 2).join(' \r\n');
        $(line).addClass((classes || '') + ' line-annotate hint');

        //  Add hint text and set offset
        line.setAttribute('data-hint', text);
        line.style.top = (start - offset - 1) * lineHeight + 'px';

        $(pre).append(line);



        //  Tool tip interaction
        $(line).on('mouseenter', function(){
            var hint = $(this).data('hint');

            $('<p class="annotateTooltip"></p>')
                .html(hint)
                .appendTo('body')
                .fadeIn('slow');
        });

        $(line).on('mouseleave', function(){
            $('.annotateTooltip')
                .remove();
        });

        $(line).on('mousemove', function(e){
            var x = e.pageX + 20,
                y = e.pageY + 10;
            $('.annotateTooltip')
                .css({ top: y, left: x })
        });





    }
}

Prism.hooks.add('after-highlight', function(env) {
    var pre = env.element.parentNode;
    //var pre = env.element;
    var lines = pre && pre.getAttribute('data-annotations');
    
    if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
        return;
    }
    
    $$('.line-annotate', pre).forEach(function (line) {
        line.parentNode.removeChild(line);
    });
    
    annotateLines(pre, lines);
});

})();

