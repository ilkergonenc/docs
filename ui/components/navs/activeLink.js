var docsActiveLink = function() {
  "use strict";

  var pathname, pathnameArray, path, folder, activeGroup, collapseId;

  pathname = window.location.pathname;

  // console.log(pathname)

  if (pathname.includes("/")) {
    // path = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
    pathnameArray = pathname.split('/');
    activeGroup = pathnameArray[pathnameArray.length - 3];
    folder = pathnameArray[pathnameArray.length - 2];
  }

  $("#docsHeader .navbar-nav a").each(function(){
    var _href = $(this).attr("href");
    if (_href.includes(folder)) {
      $(this).parent("li").addClass("active");
    }
  });

  $("#docsSidebar a").each(function(){
    var _href = $(this).attr("href");
    if (_href === pathname) {
      $(this).parent("li").addClass("active");
    }
  });


  collapseId = "#collapse" + camelCaseString(activeGroup);

  $(collapseId).addClass("show");
  $(collapseId).siblings("a").attr("aria-expanded", "true");


};
