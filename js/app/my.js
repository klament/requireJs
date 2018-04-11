define(['bootstrap'], function() {
	return {
		a: {
			change: function() {
				$("<button id='test' class='btn btn-default'>测试</button>").appendTo("body");
				$("<button id='test3' class='btn btn-default'>测试3</button>").appendTo("body");
				this.refresh();
			},
			refresh: function() {
				var $test = $("body").find("#test");
				var $test3 = $("body").find("#test3");
				$("body").on("click", "#test", changeColor).on("click", "#test3", changeColor3);

				function changeColor() {
					$test.css("marginTop", "20px");
					$("body").css("background", "#66ccff");
				}

				function changeColor3() {
					$test3.css("marginTop", "40px");
					$("body").css("background", "green");
				}
			}
		},
		b: {
			change: function() {
				$("<button id='test2' class='btn btn-default'>测试2</button>").appendTo("body");
				this.refresh();
			},
			refresh: function() {
				$("#test2").click(function() {
					$("body").css("background", "red");
				});
			}
		}
	}
});
