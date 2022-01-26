;(function($) {
  "use strict";

  $.fn.search = function(options) {
    var defaults = {
      dataUrl: "../../../assets/data/search.json",
      dataValue: "name",
      maxNumberOfElements: 8,
      noResults: true,
      noResultsMessage: "No results found."
    };

    options = $.extend( {}, defaults, options );

    return this.each(function() {

      var $el = $(this);
      
      var settings = {
        url: options.dataUrl,
        getValue: options.dataValue,   
        template: {
          type: "custom",
          method: function(value, item) {
            var output = "";
            output += "<a href='/docs/" + slugString(item.group) + "/" + slugString(item.name) + "/'class=\"text-decoration-none\">";
            output += "<h6 class='text-primary m-0'>" + capitalizeString(item.name) + "</h6>";
            output += "<p class='text-muted m-0'><small>" + capitalizeString(item.group) + " / " + capitalizeString(item.name) + "</small></p>";
            output += "</a>";
            return output;
          }
        },
        list: {
          maxNumberOfElements: options.maxNumberOfElements,
          match: { enabled: true },
          onShowListEvent: function() {
            $(".easy-autocomplete-container > ul > li").addClass("list-group-item list-group-item-action px-3 py-2");
          },
          onHideListEvent: function () {
            if (options.noResults) {
              var _inputId = $el.attr("id");
              var inputId = "#"+_inputId;
              var _listId = "eac-container-"+_inputId;
              var listId = "#"+_listId;
              var containerList = $(listId).find("ul"); 
              if ($(containerList).children("li").length <= 0) { 
                if ($(inputId).val() !== "") {
                  $(containerList).html("<li class='list-group-item text-muted'>" + options.noResultsMessage + "</li>").show(); 
                }
              }
            }
          }
        }
      };

      var newEasyAutocomplete = $el.easyAutocomplete(settings);
      
      $(".easy-autocomplete-container > ul").addClass("list-group");

      return newEasyAutocomplete;

    });
  };

})(jQuery);

// $(function() {

  // $("#search-input-header").search();
  // $("#search-input-sidebar").search();

// });