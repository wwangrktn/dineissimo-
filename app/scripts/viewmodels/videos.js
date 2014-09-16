/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Videos = (function () {

        var ds = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/videos.json",
                    dataType: "json"
                }
            }
        });

        return new kendo.observable({
            title: "Videos",
            dataSource: ds
        });

    }());
}(window));