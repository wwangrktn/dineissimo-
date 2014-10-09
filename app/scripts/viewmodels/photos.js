/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Photos = kendo.observable({

        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/photos.json",
                    dataType: "json"
                }
            }
        }),
        title: "Photos",
        init: function() {
            $("#photo-list").data("kendoMobileListView")
                .bind("dataBound", everliveImages.responsiveAll);
        }
    });
}(window));