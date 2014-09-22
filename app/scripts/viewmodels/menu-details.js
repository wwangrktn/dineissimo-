/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.MenuDetails = kendo.observable({

        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/menu.json",
                    dataType: "json"
                }
            }
        }),

        show: function (e) {
            var view = e.view;
            win.app.MenuDetails.dataSource.fetch(function () {
                var model = view.model,
                    item = win.app.MenuDetails.dataSource.get(view.params.id);
                model.set("item", item);
            });
        },

        title: "Menu Details"
    });
}(window));