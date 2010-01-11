function init() {

  // jquery plugins
  load_jcaption();
  
  // initialize site
  $('img').jcaption({
    animate: true,
    copyStyle: true,
    show: {height: "show"},
    hide: {height: "hide"} 
  });

  // Special Cufon Replacements
  Cufon.replace('h1', {
    textShadow: '-2px 3px 0 #CCCCCC',
    hover: true
  });

  // Rest
  var cufon_tags = ['h2','h3','h4','h5','blockquote'];
  for (var i in cufon_tags) {
    var tag = cufon_tags[i];
    Cufon.replace(tag, {
      hover: {
        color: '#FF0FCD'
      }
    });
  }
  
  if($(".github-block")) {
    get_github_repos(".github-block", 5);
  }
}

function load_jcaption(){
  /*
  * JCAPTION
  * Copyright (C) 2009 Joel Sutherland
  * Licenced under the MIT license
  * http://www.newmediacampaigns.com/page/jcaption-a-jquery-plugin-for-simple-image-captions
  */
  (function($){$.fn.jcaption=function(settings){settings=$.extend({wrapperElement:'div',wrapperClass:'caption',captionElement:'p',imageAttr:'alt',requireText:true,copyStyle:false,removeStyle:true,removeAlign:true,copyAlignmentToClass:false,copyFloatToClass:true,autoWidth:true,animate:false,show:{opacity:'show'},showDuration:200,hide:{opacity:'hide'},hideDuration:200},settings);$(this).each(function(){$(this).bind('load',function(){if($(this).data('loaded'))return false;$(this).data('loaded',true);var image=$(this);if(image.attr(settings.imageAttr).length>0||!settings.requireText){image.wrap("<"+settings.wrapperElement+" class='"+settings.wrapperClass+"'></"+settings.wrapperElement+">");var imageFloat=image.css('float')
  var imageStyle=image.attr('style');if(settings.removeStyle)image.removeAttr('style');var imageAlign=image.attr('align');if(settings.removeAlign)image.removeAttr('align');var div=$(this).parent().append('<'+settings.captionElement+'>'+image.attr(settings.imageAttr)+'</'+settings.captionElement+'>');if(settings.animate){$(this).next().hide();$(this).parent().hover(function(){$(this).find('p').animate(settings.show,settings.showDuration);},function(){$(this).find('p').animate(settings.hide,settings.hideDuration);});}
  if(settings.copyStyle)div.attr('style',imageStyle);if(settings.copyAlignmentToClass)div.addClass(imageAlign);if(settings.copyFloatToClass)div.addClass(imageFloat);if(settings.autoWidth)div.width(image.width());}});if(this.complete||this.naturalWidth>0){$(this).trigger('load');}});}})(jQuery);
}

function trim_len(str,len) {
  var l = str.length;
  if(l > len) {
    str = str.substr(0,len) + '...';
  } else if (l < .66*len) {
    str += "<br />&nbsp;";
  }
  return str;
}

function get_github_repos(selector,limit) {
  $.getJSON("http://github.com/api/v2/json/repos/show/carlsverre?callback=?", function(data) {
    data.repositories.reverse();
    var j = 1;
    for(var i in data.repositories) {
      var repo = data.repositories[i];
      if(repo.fork) continue;
      var html = "<li class='article github-repo'>";
      html += "<h4><a href='"+repo.url+"'>"+repo.name+"</a></h4>";
      html += "<div class='meta'>"+trim_len(repo.description,100)+"</div></li>";
      $(selector).append(html);
      if(++j>limit) break;
    }
    Cufon.refresh('h4');
  });
}
