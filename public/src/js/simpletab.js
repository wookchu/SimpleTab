/*
	simpletab.js  ᕕ( ᐛ )ᕗ

	* Version : 1.0.1
	* Author  : Wookju Choi
	* Docs    : https://github.com/wookchu/SimpleTab
	* Repo    : https://github.com/wookchu/SimpleTab
 */
(function($){

	$.fn.simpleTab = function(options){
		var el = this;

		var settings = $.extend({
			defaultSkin: false,
			onTabClass: 'selected',
			dimmedTabClass: 'dimmed',
			startIndex: 0,
			dimmedIndexs: null,
			fadeEffect: true,
			fadeSpeed: 400,
			afterChange: null
		}, options);

		var loopCount = 0;
		var tabName = el.data('tab-name') || 'defaultTab';
		var tabLength = $(el).children().length;
		var latest = {
			prevIndex: null,
			currentIndex: null
		};
		var dimmedTabList = [];
		var activeTabList = [];

		var init = function(){

			//skin setting
			if(settings.defaultSkin) setSkinClass();

			var search = location.search;

			//dimmed tab settings
			if (typeof settings.dimmedIndexs === "string" || typeof settings.dimmedIndexs === "number") {
				dimmedTabList = function(){
					var array = settings.dimmedIndexs.toString().split(',');
					for (var i in array) {
						array[i] = parseInt(array[i]);
					}
					array.sort(function(a, b){
						return a-b;
					});
					return array;
				}();

				//dimmed tab style and event
				for (var i in dimmedTabList) {
					$(el).children().eq(dimmedTabList[i]).addClass(settings.dimmedTabClass)
						 .children('a')
							.attr('style', 'cursor:default;')
							.addClass('no-event')
							.on('click', function(){
						return false;
					});
				}
			}

			activeTabList = function(){
				var array = [];
				for (var i = 0; i < tabLength; i++) {
					if (dimmedTabList.indexOf(i) < 0) array.push(i);
				}
				return array;
			}();

			if (activeTabList.length < 1){
				//no active tab
				$(el).find("a").each(function(i){
					$($(this)[0].hash).hide();
				});
				$(el).hide();

				console.warn("Warning: (", tabName, ") Active Tab can't be found. Confirm 'dimmedIndexs' Option in  your code.");
			} else {

				//check parameter for init index in url
				var pattern = new RegExp('(\\b' + tabName + '\\b)=(\\w+)','g');
				var newStartIndex = parseInt(settings.startIndex);

				if (search.match(pattern) != null) {
					var idx = parseInt(search.match(pattern)[0].split('=')[1]);
					newStartIndex = idx;
				};

				// setting start index with adjusting exception
				if (newStartIndex > tabLength - 1 || dimmedTabList.indexOf(newStartIndex) != -1)  {
					newStartIndex = (activeTabList.indexOf(settings.startIndex) > -1) ? settings.startIndex : activeTabList[0];
				}

				changeTab(newStartIndex, true);
			};

		};

		var tabClickHandler = function(e){
			var target = e.target;

			if (target.hash.length > 0 && (target.getAttribute('href').length == target.hash.length)) {
				changeTab($(target).parent().index());
				return false;
			}
		};

		var changeTab = function(i, firstLoading) {

			var tab = $(el).children().eq(i).children('a')[0];
			var contentId = tab.hash;

			firstLoading = firstLoading || false;

			latest.prevIndex = latest.currentIndex;
			latest.currentIndex = i;

			var runCallback = function(delay){
				delay = delay || 0;
				if (typeof settings.afterChange === "function" && !firstLoading) {
					setTimeout(function(){
						settings.afterChange.call(el, $(contentId), latest.prevIndex, latest.currentIndex);
					}, delay);
				}
			}

			if (tab.hash.length > 0 && (tab.getAttribute('href').length == tab.hash.length)) { //when it is effective content of tab linked and not outlink.

				if($(contentId).length < 1) {
					console.error("Error: (", tabName, ", index:", i, ") Can't be find Content linked. Please confirm content ID linked <a> tag 'href' attribute.");
				} else {
					$(el).find("a").each(function(i){
						$($(this)[0].hash).hide();
					});

					if (settings.fadeEffect) {
						$(contentId).css({
							opacity:0,
							display:'block'
						});
						var timeCnt = 100;
						var itv = setInterval(function(){
							var op = 1 - timeCnt/100;
							$(contentId).css({
								opacity: op,
							});
							timeCnt--;
						}, parseInt(settings.fadeSpeed)/100);

						setTimeout(function(){
							clearInterval(itv);
							$(contentId).css({
								opacity: 1
							}).focus();
							runCallback();
						}, parseInt(settings.fadeSpeed));

					} else {
						$(contentId).show().focus();
						runCallback(10);
					}

					$(tab).parent().addClass(settings.onTabClass).siblings().removeClass(settings.onTabClass);
				}

			} else if(++loopCount > tabLength) {
				console.warn("Warning: (", tabName,") Can't be find Contents linked your tab at all. Remove 'simpleTab' script or please confirm content ID linked tab <a> tag.")
			} else {
				//when outlink content linked tab, It's on next index tab when init this plugin.
				changeTab(activeTabList[0], true);
				console.warn("Warning: (", tabName,") startIndex is outlink tab. This is ignore startIndex and move to first index among effective indexes.")
			}
		}

		var setSkinClass = function(){
			settings.onTabClass = 'selected';
			settings.dimmedTabClass = 'dimmed';
			$(el).addClass('simple-tab').find("a").each(function(i){
				$($(this)[0].hash).addClass('simple-tab-content');
			});
		}

		return this.each(function(){
			init();
			$(this).find('a:not(".no-event")').on('click', tabClickHandler);
		});
	};
}(jQuery));
