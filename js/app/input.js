"use strict";
define(['jquery'], function($) {
	return function(option) {
		var defaults = {
			render: "",
			label: "",
			defaultsVal: "",
			id: parseInt(Math.random() * 100000),
			type: "text",
			placeholder: "",
			proper: '',
			road: '10px',
			inputWidth: '',
			validate: {},
			enterCallback: null
		}

		var settings = {};
		settings = Object.assign({}, defaults, option);

		var _input = document.createElement('input');
		_input.setAttribute('type', settings.type);
		_input.setAttribute('id', settings.id);
		_input.setAttribute('placeholder', settings.placeholder);
		if (settings.inputWidth) {
			_input.style.width = settings.inputWidth;
		}

		if (!settings.proper) {
			throw "请填写属性，方便值操作";
		}

		if (settings.render) {
			if (settings.label) {
				var _render = "#" + settings.render;
				var inputPanel = $("<div class='inputPanel'></div>").appendTo($(_render));
				var _label = $("<div>" + settings.label + "</div>").appendTo(inputPanel);
				_label.css({
					color: 'grey',
					fontSize: '15px',
					marginTop: settings.road,
					marginBottom: '5px',
					position: 'relative'
				});
				var _errorTip = $("<div class='error'></div>").appendTo(_label);
			}
			$(_input).appendTo(inputPanel);
		} else {
			if (settings.label) {
				var inputPanel = $("<div class='inputPanel'></div>").appendTo($("body"));
				var _label = $("<div>" + settings.label + "</div>").appendTo(inputPanel);
				_label.css({
					color: 'grey',
					fontSize: '15px',
					marginTop: settings.road,
					marginBottom: '5px',
					position: 'relative'
				});
				var _errorTip = $("<div class='error'></div>").appendTo(_label);
			}
			$(_input).appendTo($(inputPanel));
		}

		//获取input的id
		this.id = settings.id;
		var inputDom = "#" + this.id;

		//改变input的值
		this.val = function(str) {
			if (typeof str !== 'string') {
				throw "请输入字符串";
			}
			_input.value = str;
		}

		//取得input的值
		this.get = function() {
			var arr = {};
			arr.proper = settings.proper;
			arr.value = _input.value
			return arr;
		}

		this.val(settings.defaultsVal);

		//验证流程
		this.validate = function(validateArr) {
			var error = 0;
			var inputDom = "#" + this.id;
			if ($(inputDom).hasClass("errorBorder")) {
				error = 1;
				return error;
			}
			if (!validateArr) {
				if (this.get().value == "") {
					$(inputDom).addClass("errorBorder");
					$(_errorTip).text(settings.label + "不能为空").addClass("show");
					error++;
				}
			} else {
				if (this.get().value == "") {
					$(inputDom).addClass("errorBorder");
					$(_errorTip).text(settings.label + "不能为空").addClass("show");
					error++;
					return error;
				}
				for (var i = 0; i < validateArr.length; i++) {
					var regFun = validateArr[i].fun;
					if (regFun(this.get().value)) {
						$(inputDom).addClass("errorBorder");
						$(_errorTip).text(validateArr[i].tip).addClass("show");
						error++;
						break;
					}
				}
			}
			return error;
		}

		this.disable = function() {
			_input.setAttribute('disabled', 'disabled');
		}

		this.addError = function(tip) {
			$(inputDom).addClass("errorBorder");
			$(_errorTip).text(tip).addClass("show");
		}

		function removeError() {
			$(inputDom).removeClass("errorBorder");
			$(_errorTip).removeClass("show");
		}

		$(inputDom).focus(function() {
			removeError();
		});
		
		$(inputDom).keydown(function(event) {// 键盘按下事件
			// 如果按键编号是13，表示按下的是回车
			if (event.which == 13) {
				//执行回车事件
				settings.enterCallback?settings.enterCallback():null;
			}
		});
	}
});