/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Photos = (function () {

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
}(window));