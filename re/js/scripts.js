$(function() {
  "use strict";

  var BendDocs = {
    init: function () {

      BendDocs.toc();
      BendDocs.clipboard();
      BendDocs.activeLink();
      BendDocs.search();
      BendDocs.smoothScroll();
      BendDocs.others();
  
    },
    toc: docsToc,
    clipboard: docsClipboard,
    activeLink: docsActiveLink,
    search: function () {

      $("#search-input-header").search();
      $("#search-input-sidebar").search();

    },
    smoothScroll: function () {

      // var pageOffset = 80;
      var scrollSpeed = 500;

      $(document).on("click", "a.toc-list-group-link", function (event) {
        event.preventDefault();
        var target = $(this).attr("href");
        $("html, body").animate({
          scrollTop: $(target).offset().top
        }, scrollSpeed, function() {
          window.location.hash = target;
        });
      });
    },
    others: function () {
      
      $("#mobileDD button[data-toggle=collapse]").on("click", function(e) {
        e.stopPropagation();
        $("#versionsCollapse").collapse("toggle");
      });
      
      // if($("[data-bend='drawer']").length) {
      //   $("[data-bend='drawer']").drawer();
      // }

      // if($("[data-bend-toggle='password']").length) {
      //   $("[data-bend-toggle='password']").togglePassword();
      // }
      
    }
  }
  
  BendDocs.init();

});