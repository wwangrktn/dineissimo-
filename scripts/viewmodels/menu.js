/*jslint browser: true */
/*global app, kendo */

//View Model for the menu page.
var app = app || {};

app.Menu = (function () {
    'use strict';

    var ds = new kendo.data.DataSource({
        transport: {
            read: {
                url: "data/menu.json",
                dataType: "json"
            }
        }
    });

    return new kendo.observable({
        title: "Menu",
        dataSource: ds,
        show: function (e) { console.log('testing', e); }
    });

}());