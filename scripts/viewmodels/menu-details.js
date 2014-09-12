/*jslint browser: true */
/*global app, kendo */

//View Model for the Menu Details page.
var app = app || {};

app.MenuDetails = (function () {
    'use strict';

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