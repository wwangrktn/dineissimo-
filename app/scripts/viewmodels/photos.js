/*jslint browser: true */
/*global app, kendo */

//View Model for the Photos page.
var app = app || {};

app.Photos = (function () {
    'use strict';

    var ds = new kendo.data.DataSource({
        transport: {
            read: {
                url: "data/photos.json",
                dataType: "json"
            }
        }
    });

    return new kendo.observable({
        title: "Photos",
        dataSource: ds
    });

}());