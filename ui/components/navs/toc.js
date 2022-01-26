var docsToc = function() {
  "use strict";

  var items = "main > .page-content > h2, main > .page-content > h3, main > .page-content > h4, main > .page-content > h5";

  var anchors = new AnchorJS({
    icon: "#"
  });
  anchors.add(items);

  var navToc = $("nav#nav-toc > ul.toc-list-group");

  $(items).each(function() {
    var _this = $(this),
        level = _this[ 0 ].localName,
        href = _this.attr("id"),
        title = _this.html(),
        tocItem = "";
    
    tocItem += "<li class=\"toc-list-group-item toc-" + level + "\">";
    tocItem += "<a href=\"#" + href + "\" class='toc-list-group-link'>" + title + "</a>";
    tocItem += "</li>";

    navToc.append(tocItem);
  });

  $("nav#nav-toc .anchorjs-link").remove();

};
