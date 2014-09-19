/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Menu = (function () {

        var ds = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/menu.json",
                    dataType: "json"
                }
            }
        });

        var changeView = function (e) {
            e.preventDefault();
            var icon = $('#view-changer .km-icon');
            if (icon.hasClass('km-th-large')) {
                icon.removeClass('km-th-large').addClass('km-list-bullet');
                $("#popular-list").attr('data-template', 'photoMenuItem');
            } else {
                icon.removeClass('km-list-bullet').addClass('km-th-large');
                $("#popular-list").attr('data-template', 'menuItem');
            }
        };

        return new kendo.observable({
            title: "Menu",
            dataSource: ds,
            changeView: changeView
        });

    }());
}(window));