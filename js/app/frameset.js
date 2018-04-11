"use strict";
define(['jquery'], function($) {
	return function(option) {
		var defaults = {
			render: 'body',
			logoText: 'SYSTEM',
			loginoutCallback: null,
			username: '用户名',
			mainhref: 'https://www.baidu.com',
			copyright: '版权保护'
		}

		var settings = {};
		$.extend(settings, defaults, option);
		this.leftNavRender = "#leftNavRender"; //左菜单render
		this.rightNavRender = "#rightNavRender"; //右菜单render
		this.iframeArea = ".iframeArea"; //iframe的render
		var leftNavRender = this.leftNavRender; //左菜单render
		var rightNavRender = this.rightNavRender; //右菜单render
		var iframeArea = this.iframeArea; //iframe的render

		this.build = function() {
			var _html = `<div class="framePanel"><div class="head"><div class="logo">` + settings.logoText + `</div><div class="info"><span class="username">` + settings.username + `</span><span class="back"><i class="back_icon"></i><span>注销</span></span></div></div><div class="container"><div class="left"><div class="fold"><i class="logo"></i></div><div id="leftNavRender" class="nav"></div></div><div class="right"><ul id="rightNavRender" class="nav"><li id="mainNav" class="navLi selected"><i class="icon" style="background: url(img/index_icon.png) no-repeat;"></i><span>主页</span></li></ul><div class="iframeArea"><iframe id="mainIframe" src="` + settings.mainhref + `" frameborder="0"></iframe></div><div class="footer">` + settings.copyright + `</div></div></div></div>`;
			$(settings.render).append(_html);
			$("#mainNav").click(function(){
				$(rightNavRender).find(".navLi").removeClass("selected");
				$(this).addClass("selected");
				$(iframeArea).find("iframe").addClass("hidden");
				$("#mainIframe").removeClass("hidden");
			});
			$(".back").click(function(){
				$.post("exit.action",function(res){
					window.location.href = "page/login.jsp";
				});
			});
			$(".fold").click(function(){
				$(".left").toggleClass("left_shift");
				$(".right").toggleClass("right_shift");
			});
		}

		//打开iframe
		this.openIframe = function(data) {
			var title = data.sonM;
			var hrefurl = data.hrefurl;
			var icon = data.sonicon;
			var alias = data.alias;
			var rendered = "#" + alias;
			var iframeId = alias + "_Iframe";
			if ($(rendered).length != 0) {
				$(rightNavRender).find(".navLi").removeClass("selected");
				$(rendered).addClass("selected");
				$(iframeArea).find("iframe").addClass("hidden");
				$("#" + iframeId).removeClass("hidden");
				return;
			}
			$(rightNavRender).find(".navLi").removeClass("selected");
			var rightNav = $('<li id=' + alias + ' class="navLi selected"><i class="icon son" style="background: url(' + icon + ') no-repeat;"></i><span>' + title + '</span><span class="close">×</span></li>').appendTo($(rightNavRender));
			$(iframeArea).find("iframe").addClass("hidden");
			var rigthIframe = $('<iframe id="'+iframeId+'" src="'+hrefurl+'" frameborder="0"></iframe>').appendTo($(iframeArea));
			$(rightNav).click(function(){
				$(rightNavRender).find(".navLi").removeClass("selected");
				$(this).addClass("selected");
				$(iframeArea).find("iframe").addClass("hidden");
				$("#" + iframeId).removeClass("hidden");
			});
			$(rightNav).find(".close").click(function(event){
				var parentNode =  $(this).parent();
				if(parentNode.hasClass("selected")){
					parentNode.prev().addClass("selected");
					parentNode.remove();
					$("#" + iframeId).prev().removeClass("hidden");
					$("#" + iframeId).remove();
				}else{
					parentNode.remove();
					$("#" + iframeId).remove();	
				}
				event.stopPropagation();
			});
		}

		this.build();

		delete this.build;
	}
});