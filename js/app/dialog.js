"use strict";
define(['jquery'], function($) {
	return function dialog(option) {
		var defaults = {
			render: "body", //生成节点
			title: "标题",
			width: 650,
			height: 445,
			url: null, //弹出层iframe指向的地址
			confirm: null, //是否是确认框
			text: "提示", //确认框提示文字
			onClickYes: null //确认框绑定功能按钮
		}

		var settings = {};
		$.extend(settings, defaults, option);
		var render = top.$(settings.render);

		//创建弹出层
		this.build = function() {
			render.removeClass().addClass("dialog dialogHidden hidden");
			var html = "<div class='dialogContent'>";
			html += "<div class='dialogTitle'></div>";
			if (settings.confirm == true) {
				// 确认对话框
				html += "<div class='dialogIframe'>";
				html += "<div style='text-align: center;padding: 0 0 30px 0;'>" + settings.text + "</div>";
				html += "<div style='text-align: center;'>";
				html += "<input class='btnOK' type='button' value='确认' style='margin-right: 10px;padding: 5px 58px;'/>";
				html += "<input class='btnCancel' type='button' value='取消' style='padding: 5px 58px;'/></div>";
				html += "</div>";
			} else {
				// 普通对话框
				html += "<iframe class='dialogIframe' src='' frameborder='0'></iframe>";
				html += "<div style='text-align: center;'>";
				html += "<input class='btnCancel' type='button' value='关闭' style='padding: 5px 58px;'/></div>";
			}
			html += "</div></div>";
			render.html(html);
			if (!render.next().hasClass("dialogMask")) {
				$("<div class='dialogMask hidden'></div>").insertAfter(render);
			}
			//绑定事件
			// 确认对话框
			var that = this;
			if (settings.confirm == true) {
				top.$(".btnOK", render).click(function() {
					settings.onClickYes ? settings.onClickYes() : null;
					that.hideDialog();
				});
			}
			top.$(".btnCancel", render).click(function() {
				that.hideDialog();
			});
		}
		// 隐藏弹出层
		dialog.prototype.hideDialog = function() {
			top.$(".dialogMask").addClass("hidden");
			/*if (top.util.isLTIE10()) {
				// 浏览器版本<IE10时使用jquery实现动画
				top.$(".dialog").animate({
					height: 0,
					top: top.$(top.window).height() / 2
				}, "fast");*/
			//} else {
				// 浏览器版本>=IE10时使用css3样式实现动画
				top.$(".dialog").css("transition", "all 250ms");
				top.$(".dialog").addClass("dialogHidden");
			//}
			setTimeout(function() {
				top.$(".dialog").addClass("hidden");
			}, 250);
		}
		// 显示弹出层
		dialog.prototype.showDialog = function() {
			// 修改弹出层中iframe的地址
			$(".dialogIframe", render).attr("src", settings.url);
			// 获取浏览器窗口高度、宽度
			var h = top.$(top.window).height();
			var w = top.$(top.window).width();
			var dialogTop = h / 2 - (settings.height + 137) / 2;
			dialogTop = dialogTop < 10 ? 10 : dialogTop;
			// 定位弹出层，修改弹出层宽度、高度
			top.$(render).css({
				top: dialogTop
			});
			top.$(".dialogContent", render).css("width", settings.width);
			top.$(".dialogIframe", render).css("height", settings.height);
			top.$(".dialogMask").removeClass("hidden");
			// 设置弹出层的标题
			top.$(".dialogTitle", render).text(settings.title);

			// 显示弹出层
			/*if (util.isLTIE10()) {
				// 浏览器版本<IE10时使用jquery实现动画
				top.$(".dialog").height(0).css("top", h / 2);
				top.$(".dialog").removeClass("dialogHidden hidden");
				top.$(".dialog").animate({
					height: settings.height + 103,
					top: dialogTop
				}, "fast");
			} else {*/
				top.$(".dialog").removeClass("hidden");
				setTimeout(function() {
					// 浏览器版本>=IE10时使用css3样式实现动画
					top.$(render).css("transition", "all 250ms");
					top.$(".dialog").removeClass("dialogHidden");
					setTimeout(function() {
						top.$(render).css("transition", "all 0ms");
					}, 250);
				}, 1);
			//}
		}
		this.build();
		delete this.build;
	}
});