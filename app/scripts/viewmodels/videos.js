/*jslint browser: true */
/*global app, kendo */

//View Model for the Videos page.
var app = app || {};

app.Videos = (function () {
    "use strict";

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