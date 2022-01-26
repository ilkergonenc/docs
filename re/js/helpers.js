var camelCaseString = function (str){
  return str.split("-").map(function(word, i){
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join("");
};

var capitalizeString = function (str) {
  return str = str.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
    return txtVal.toUpperCase();
  });
};

var slugString = function (str) {
  return str.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
};