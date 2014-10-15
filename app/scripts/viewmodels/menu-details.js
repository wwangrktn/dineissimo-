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
            win.app.Menu.dataSource.fetch(function () {
                var model = view.model,
                    item = win.app.Menu.dataSource.get(view.params.id);
                model.set("item", item);
                everliveImages.responsiveAll();
            });
        },

        title: "Menu Details"
    });
}(window));
