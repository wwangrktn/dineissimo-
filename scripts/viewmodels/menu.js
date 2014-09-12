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

    var changeView = function (e) {
        console.log('View Changed', e.currentTarget.text);
    };

    return new kendo.observable({
        title: "Menu",
        dataSource: ds,
        changeView: changeView
    });

}());