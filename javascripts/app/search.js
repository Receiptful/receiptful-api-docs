!function(e){function t(){$("h1, h2").each(function(){var e=$(this),t=e.nextUntil("h1, h2");h.add({id:e.prop("id"),title:e.text(),body:t.text()})})}function i(){a=$(".content"),r=$(".dark-box"),l=$(".search-results"),$("#input-search").on("keyup",n)}function n(e){if(o(),l.addClass("visible"),27===e.keyCode&&(this.value=""),this.value){var t=h.search(this.value).filter(function(e){return e.score>1e-4});t.length?(l.empty(),$.each(t,function(e,t){l.append("<li><a href='#"+t.ref+"'>"+$("#"+t.ref).text()+"</a></li>")}),s.call(this)):(l.html("<li></li>"),$(".search-results li").text('No Results Found for "'+this.value+'"'))}else o(),l.removeClass("visible")}function s(){this.value&&a.highlight(this.value,c)}function o(){a.unhighlight(c)}var a,r,l,c=($(e),{element:"span",className:"search-highlight"}),h=new lunr.Index;h.ref("id"),h.field("title",{boost:10}),h.field("body"),h.pipeline.add(lunr.trimmer,lunr.stopWordFilter),$(t),$(i)}(window);