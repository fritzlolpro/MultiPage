/*
MultiPage Script by Fedor Sorokin
https://telegram.me/Fritzlolpro
http://fedorsorokin.ru/
©2017

*/

// JSON goes here
var multi={
"keys": [
  {"utm_term":"перегородочные, перегородки", "multi_text":"Перегородочные блоки", "multi_image":"gi1.png"},
  {"utm_term":"перемычки", "multi_text":"Блоки перемычки", "multi_image":""},
  {"utm_term":"стеновые", "multi_text":"Стеновые блоки", "multi_image":"gi.png"}]
}

$(function() {
  //generates utm parametrs array
  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  }

  utm=[];
  $.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){
    utm[v]=getURLParameter(v) || $.cookie(v);
    $.cookie(v, utm[v], { expires: 365, path: '/' });
  });

  //if target parametr exists it compares if it matches with some of custom utm term words
  var ab_title="default";
  var ab_image="default";
  if (utm['utm_term']) {
   for (var i = 0; i<multi.keys.length; i++) {
     var word=multi.keys[i].utm_term.split(', '); //comma+whitespace only TODO:optional separator
      var matched=false;
      for(var j=0;j<word.length;j++){
         if (word[j]===utm['utm_term']) {matched=true};
      }
      if (matched) {
        //change html of the element with target class
        ab_title=multi.keys[i].multi_text;
        var target = $('.multi'); 
        target.html(ab_title);
        //change src of img with target class only if you have custom
        if (multi.keys[i].multi_image) {
          ab_image=multi.keys[i].multi_image;
          var target = $('.multi-img'); 
          target.attr("src", ab_image ); 
        }
      }
     }
  }
});
