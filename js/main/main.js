require.config({
	baseUrl: './js/app',
	paths: {
		'jquery': '../lib/jquery',
		'bootstrap': '../lib/bootstrap'
	},
	map: {
		'*': {
			'css': '../lib/css.min'
		}
	},
	//解决js依赖
	shim: {
		//使用下面模块时候需要加载jquery和一个css
		'bootstrap': {
			'deps': ['jquery', 'css!../../css/bootstrap.css']
		}
	}
});

require(['my'], function(my) {
	my.a.change();
})