"use strict";
define(['jquery'], function($) {
	return function(option) {
		var defaults = {
			render: 'body',
			data: [{
				ulM: '标题',
				ulicon: '',
				son: [{
					sonM: '子标题1',
					sonicon: '',
					callback: null,
					hrefurl: '',
					alias: ''
				}, {
					sonM: '子标题2',
					sonicon: '',
					callback: null,
					hrefurl: '',
					alias: ''
				}]
			}]
		}

		var settings = {};
		$.extend(settings, defaults, option);


		this.build = function() {
			var data = settings.data;
			var navTree = $('<ul class="navTree"></ul>').appendTo($(settings.render));
			for (var x in data) {
				var navLi = $('<li></li>').appendTo(navTree);
				var navA = $('<a class="menuNav" href="javascript:;"><i style="background:url(' + data[x].ulicon + ') no-repeat;"></i><span class="text">' + data[x].ulM + '</span></a>').appendTo(navLi);
				var navDl = $('<dl></dl>').appendTo(navLi);
				var datason = data[x].son;
				for (var y in datason) {
					var navDt = $('<dt class><i style="background:url(' + datason[y].sonicon + ') no-repeat;"></i><span>' + datason[y].sonM + '</span></dt>').appendTo(navDl);
					var tip = $('<div class="tip">' + datason[y].sonM + '</div>').appendTo(navDt);
					$(navDt).hover(function() {
						$(this).find(".tip").addClass("change");
					}, function() {
						$(this).find(".tip").removeClass("change");
					});
					(function(y) {
						$(navDt).click(function() {
							$(navTree).find("dt").removeClass("selected");
							$(this).addClass("selected");
							datason[y].callback ? datason[y].callback(datason[y]) : null;
						});
					})(y);
				}
			}
		}

		this.build();

		delete this.build;
	}
});