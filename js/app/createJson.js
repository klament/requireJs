"use strict";
define([], function() {
    return function(arr, prop, val) {
        // 参数：prop = 属性，val = 值
        // 如果 val 被忽略
        if (typeof val === "undefined") {
            // 删除属性
            delete arr[prop];
        } else {
            // 添加 或 修改
            arr[prop] = val;
        }
    }
});