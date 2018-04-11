"use strict";
define([], function() {
    return function area(option) {
        var defaults = {
            render: 'body',
            top: '13px',
            id: 'area_' + parseInt(Math.random() * 100000)
        }

        var settings = {};
        $.extend(settings, defaults, option);

        this.id = settings.id;

        area.prototype.build = function() {
            var area = $('<div id="' + settings.id + '" class="area"></div>').appendTo($(settings.render));
            area.css({
                marginTop: settings.top
            });
        }

        this.build();
    }
});