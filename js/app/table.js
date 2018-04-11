"use strict";
define(['jquery'], function($) {
	return function table(option) {
		var defaults = {
			render: 'body',
			pageRender: 'body', //分页位置
			id: "table_" + parseInt(Math.random() * 100000),
			param: { //查询参数对象
				pageNo: 1, //默认查询从第一页，页码
				pageSize: 10 //默认每页数据量为10
			},
			colums: [{
				name: "用户编号",
				alias: "id",
				hide: true //是否隐藏列
			}, {
				name: "登录名",
				alias: "loginName",
				ell: false //是否超出省略
			}, {
				name: "密码",
				alias: "pwd",
				formatter: null //自定义模板
			}],
			dataSource: "", //接口地址
			rowClick: null //行点击事件
		}

		var settings = {};
		$.extend(settings, defaults, option);

		this.param = settings.param; //暴露给外部可改查询参数
		this.isSelectedData = {}; //被行点击选中的数据对象

		//初始化数据
		table.prototype.init = function(callback) {
			var param = this.param;
			var url = settings.dataSource
			$.post(url, param, function(res) {
				var data = JSON.parse(res);
				if (data.total == 0) {
					$(settings.render).html("");
					$(settings.pageRender).html("");
					$("<div class='noDataTip'>没有任何数据</div>").appendTo($(settings.render));
					return;
				}
				callback.tb ? callback.tb(data.data) : null;
				callback.page ? callback.page(data.total) : null;
			}, "text");
		}

		var that = this; //防止回调函数this指向改变
		//建表
		table.prototype.build = function(data) {
			// 获取表格所在div的对象
			var render = $(settings.render);
			// 无论div中有什么，向里面插入表格之前先全部清除
			$(render).html("");
			// 生成表格跟元素
			var table = $("<table id=" + settings.id + " cellpadding='0' cellspacing='0'></table>").addClass("grid").appendTo(render);
			// 生成第二级节点
			var thead = $("<thead></thead>").appendTo(table);
			var tbody = $("<tbody></tbody>").appendTo(table);
			// 向表头中插入一个tr
			var theadTr = $("<tr></tr>").appendTo(thead);
			// 遍历生成表头的TH元素
			$(settings.colums).each(function(i, column) {
				var th = $("<th>" + column.name + "</th>").appendTo(theadTr);
				// 如果传入的参数中包含hide属性且值为true，就在生成该列时给th加上hidden样式
				if (column.hide)
					$(th).addClass("hidden");
			});
			// 遍历表格数据数组生成行
			$(data).each(function(i, t) {
				var tbodyTr = $("<tr></tr>").appendTo(tbody);
				// row放的是一行中所有数据的对象
				var row = data[i];
				// 遍历gridColumn生成一行中的每一列
				$(settings.colums).each(function(i2, column) {
					if(column.noColumn){
						var no = that.param.pageSize * (that.param.pageNo - 1) + i + 1;
						var td = $("<td>" + no + "</td>").attr("alias", "noColumn_alex").appendTo(tbodyTr);
					}else{
						// 单元格的内容
						var cellValue = row[column.alias];
						// 如果字段拥有属性column.formatter同时该属性的是一个方法
						if (column.formatter != null && $.isFunction(column.formatter)) {
							// 调用给方法并传入cellValue
							cellValue = column.formatter(cellValue);
						}
						var td = $("<td title="+cellValue+">" + cellValue + "</td>").attr("alias", column.alias).appendTo(tbodyTr);
					}
					// 如果传入的参数中包含hide属性且值为true，就在生成该列时给td加上hidden样式
					if (column.hide)
						$(td).addClass("hidden");
					// 如果传入的参数中包含align属性且值为right，就在生成该列时给td加上alignRight样式
					if (column.align == "right")
						$(td).addClass("alignRight");
					if (column.ell)
						$(td).addClass("ellipsis");
				});
			});
			//绑定表格事件

			var renderTb = $("#" + settings.id);
			// 表格行点击事件

			$(renderTb).find("tbody>tr").click(function() {
				var isSelected = true;
				// 如果已经被选中
				if ($(this).hasClass("gridSelected")) {
					// 清除选中状态
					$(this).removeClass("gridSelected");
					isSelected = false;
					that.isSelectedData = {};
				} else {
					// 移除所有行的选中样式
					$("tr", renderTb).removeClass("gridSelected");
					// 给点击的当前行增加选中样式
					$(this).addClass("gridSelected");
					that.isSelectedData = {};
					// 遍历行中的每一个Td
					var tr = $(this);
					$("td", tr).each(function() {
						// 获取td的别名属性
						var alias = $(this).attr("alias");
						that.isSelectedData[alias] = $(this).text();
					});
					isSelected = true;
				}
				// 如果args.rowClick属性存在
				settings.rowClick ? settings.rowClick(isSelected) : null;
			});
		}

		//生成分页
		table.prototype.createPage = function(data) {
			var render = $(settings.pageRender);
			render.html("");
			// 生成表格分页栏
			var pager = $("<div class='pager'></div>").appendTo(render);
			var pagerTable = $("<table class='pagerTable' cellpadding='0' cellspacing='0'>").appendTo(pager);
			var html = "<tr><td style='width: 133px;'>共<span class='total'>" + data + "</span>项，";
			html += "每页显示</td><td style='width: 30px;'><div class='sltPageSize'>" + that.param.pageSize + "</div></td><td>项</td>";
			html += "<td style='text-align: right;'><span class='btnPrev pagerBtn'>上一页</span>";
			html += "<span class='lblCurrentPage'>" + that.param.pageNo + "</span>/<span class='lblTotalPage'>";
			html += Math.ceil(data / that.param.pageSize) + "</span>";
			html += "<span class='btnNext pagerBtn'>下一页</span></td></tr>";
			$(pagerTable).html(html);

			//绑定上下页事件
			// 上一页按钮点击事件
			$(".btnPrev", render).click(function() {
				// 获取显示当前页码的span标签
				var cp = $(".lblCurrentPage", render);
				// 获取该标签内的当前页码
				var page = $(cp).text();
				if (page == 1) {
					return;
				}
				// 如果页码-1不小于1就给页码的值-1，否则页码的值为1
				page = (page - 1) < 1 ? 1 : page - 1;
				// 将-1之后的页码page设置到存放页码的span标签
				$(cp).text(page);
				// 重新加载表格
				that.param.pageNo = page;
				that.reload(that.param);
			});
			// 下一页按钮点击事件
			$(".btnNext", render).click(function() {
				// 获取显示当前页码的span标签
				var cp = $(".lblCurrentPage", render);
				// 获取该标签内的当前页码
				var page = $(cp).text();
				// 获取最大页码
				var maxPage = $(".lblTotalPage", render).text();
				if (page == maxPage) {
					return;
				}
				// 当前页码+1后赋值给newPage新页码
				var newPage = parseInt(page) + 1;
				// 如果+1之后的新页码超过了最大页码，就使用最大页码，否则使用+1之后的新页码
				page = newPage > maxPage ? maxPage : newPage;
				// 将+1之后的页码page设置到存放页码的span标签
				$(cp).text(page);
				// 重新加载表格
				that.param.pageNo = page;
				that.reload(that.param);
			});
		}

		//重新加载
		table.prototype.reload = function(data) {
			if(data){
				this.param = data;
			}
			this.init({ tb: this.build, page: this.createPage });
		}

		//生成表格
		this.init({ tb: this.build, page: this.createPage });
	}
});