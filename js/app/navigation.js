"use strict";
define([], function() {
	return function(option) {
		var defaults = {
			render: 'body',
			textmain: '主位置',
			textletter: null
		}

		var settings = {};
		$.extend(settings, defaults, option);

		this.build = function() {
			if (settings.textletter) {
				var _html = `<div class="navigation"><i class="icon"></i><span>当前位置：</span><span class="formerText">` + settings.textmain + `</span>>><span class="letterText">` + settings.textletter + `</span></div>`;
			} else {
				var _html = `<div class="navigation"><i class="icon"></i><span>当前位置：</span><span class="formerText">` + settings.textmain + `</span></div>`;
			}
			$(settings.render).html(_html);
		}

		this.build();
		delete this.build;
	}
});