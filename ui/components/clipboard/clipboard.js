var docsClipboard = function() {
  "use strict";
  
  $("table").addClass('table table-bordered table-striped');

  hljs.initHighlightingOnLoad();

  $("pre").each(function() {
    var _this = $(this);
    if (_this.parents("figure.highlight").length === 0) {
      _this.wrap("<figure class='highlight'></figure>");
    } else if (_this.hasClass()) {
      _this.removeClass();
    }
  })


  var highlightFigure = $("figure.highlight"),
  clipboardCopyButton = "<button type='button' class='btn btn-clipboard' data-toggle='tooltip' data-placement='top' title='Copy to clipboard'>Copy</button>";

  if (highlightFigure.length) {
    $("figure.highlight").before(clipboardCopyButton);
    $(".btn-clipboard").tooltip().on("mouseleave", function(e) {
      setTimeout(function() {
        $(e.target).blur();
      }, 500);
    });
  }

  new ClipboardJS(".btn-clipboard", {
    target: function(trigger) {
      return trigger.nextElementSibling;
    }
  }).on("success", function(e) {
    $(e.trigger).attr("data-original-title", "Copied!").tooltip("show").attr("data-original-title", "Copy to clipboard");
    e.clearSelection();
  }).on("error", function(e) {
    $(e.trigger).attr("data-original-title", "Couldn't copy!").tooltip("show").attr("data-original-title", "Copy to clipboard");
    e.clearSelection();
  });
  
};