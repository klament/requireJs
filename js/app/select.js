"use strict";
define(['jquery'], function($) {
	return function(option) {
		var defaults = {
			render: "",
			label: "",
			defaultsVal: [{
				field: 'def',
				val: '请选择',
				selected: true
			}, {
				field: 'def',
				val: '是',
				selected: false
			}, {
				field: 'def',
				val: '否',
				selected: false
			}],
			id: "select" + parseInt(Math.random() * 100000),
			proper: '',
			road: '10px',
			inputWidth: '',
			defaultSelected: 'def'
		}

		var settings = {};
		settings = Object.assign({}, defaults, option);

		var _select = document.createElement('select');
		_select.setAttribute('id', settings.id);
		var optiondata = settings.defaultsVal;
		var _html = "";
		for (var x in optiondata) {
			if (optiondata[x].selected) {
				_html += "<option value=" + optiondata[x].field + " selected = 'selected'>" + optiondata[x].val + "</option>";
			} else {
				_html += "<option value=" + optiondata[x].field + ">" + optiondata[x].val + "</option>";
			}
		}
		$(_html).appendTo($(_select));

		if (settings.inputWidth) {
			_select.style.width = settings.inputWidth;
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
			$(_select).appendTo(inputPanel);
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
			$(_select).appendTo(inputPanel);
		}

		//获取input的id
		this.id = settings.id;
		var selectDom = "#" + this.id;

		//改变select的值
		this.val = function(str) {
			if (typeof str !== 'string') {
				throw "请输入字符串";
			}
			_select.value = str;
		}

		//取得select的值
		this.get = function() {
			var arr = {};
			arr.proper = settings.proper;
			arr.value = (_select.value == "def" ? "" : _select.value);
			return arr;
		}

		this.disable = function() {
			_select.setAttribute('disabled', 'disabled');
		}

		this.val(settings.defaultSelected);

		/*this.addError = function(tip) {
			$(selectDom).addClass("errorBorder");
			$(_errorTip).text(tip).addClass("show");
		}

		function removeError() {
			$(selectDom).removeClass("errorBorder");
			$(_errorTip).removeClass("show");
		}

		$(selectDom).focus(function() {
			removeError();
		});*/
	}
});