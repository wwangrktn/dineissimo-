/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Menu = (function () {

        var ds = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/menu.json",
                    dataType: "json"
                }
            }
        });

        var changeView = function (e) {
            console.log("View Changed", e.currentTarget.text);
        };

        return new kendo.observable({
            title: "Menu",
            dataSource: ds,
            changeView: changeView
        });

    }());
}(window));