// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);

(function($) {
	
    var self = $.nCage = new function(){};
	
    $.extend(self, {
        nCageImgs : [
           'https://www.planwallpaper.com/static/images/kitty-cat.jpg',
            'https://ichef.bbci.co.uk/news/1024/cpsprodpb/693C/production/_95804962_p0517py6.jpg',
            'http://up.gc-img.net/post_img/2015/10/N5wbtafoAD6zG6J_3wZ7O_66.jpeg',
            'https://lh3.googleusercontent.com/wOaISKipagCM8JBahjrIWc3t38Nzxhe1UlfqAD5pqS8gpUq_hBaPYVQ8zTbmYyFKMRuhHPUaWY-nnLTsqOYZeQ=s0',
            'https://s-media-cache-ak0.pinimg.com/736x/27/cf/cd/27cfcd2fefc4db6d3de473e3f7c7f00b.jpg'
        ],
        handleImages : function (lstImgs, time)
        {
            $.each($('img'), function(i,item) { 
                //Skip if image is already replaced
                if($.inArray($(item).attr('src'), lstImgs) == -1)
                {
					var h = $(item).height();
					var w = $(item).width();
					
					//If image loaded
					if(h > 0 && w > 0)
					{
						//Replace
						$(item).css('width', w + 'px').css('height', h + 'px');
						$(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]); 
					}
					else
					{
						//Replace when loaded
						$(item).load(function(){
							//Prevent 'infinite' loop
							if($.inArray($(item).attr('src'), lstImgs) == -1)
							{
								var h = $(item).height();
								var w = $(item).width();
								$(item).css('width', w + 'px').css('height', h + 'px');
								$(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]); 
							}
						});
					}
				}
            });
			
            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        }
    });

    //Run on jQuery ready
    $(function(){
        self.handleImages(self.nCageImgs, 3000);
    });
})(jQuery);