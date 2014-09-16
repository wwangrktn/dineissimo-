/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.MenuDetails = (function () {

        var ds = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/menu.json",
                    dataType: "json"
                }
            }
        });

        var show = function (e) {
            var view = e.view;
            ds.fetch(function () {
                var model = view.model,
                    item = ds.get(view.params.id);
                model.set("item", item);
            });
        };

        return new kendo.observable({
            title: "Menu Details",
            dataSource: ds,
            show: show
        });

    }());
}(window));