/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Menu = kendo.observable({

        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/menu.json",
                    dataType: "json"
                }
            }
        }),

        favorites: new kendo.data.DataSource({
            data: []
        }),

        photoListVisible: false,
        inListView: true,
        title: "Menu",

        addToFavorites: function (e) {
            e.preventDefault();
            var fromDs = win.app.Menu.dataSource.get(e.data.id);
            if (!fromDs.favorited) {
                fromDs.set('favorited', true);
                win.app.Menu.favorites.add(fromDs);
            }
            //Note: this is here until we figure out why sync on the ds didn't work
            $("#popular-list").data("kendoMobileListView").refresh();
        },

        addToCart: function (e) {
            e.preventDefault();
            var fromDs = win.app.Menu.dataSource.get(e.data.id);
            if (!fromDs.favorited) {
                fromDs.set('incart', true);
                fromDs.set('qty', 1);
                win.app.ShoppingCart.cart.add(fromDs);
            }
            //Note: this is here until we figure out why sync on the ds didn't work
            $("#popular-list").data("kendoMobileListView").refresh();
        },

        changeView : function (e) {
            var that = this;
            e.preventDefault();
            var icon = $('#view-changer .km-icon');
            if (icon.hasClass('km-th-large')) {
                icon.removeClass('km-th-large').addClass('km-list-bullet');
                that.set("photoListVisible", true);
            } else {
                icon.removeClass('km-list-bullet').addClass('km-th-large');
                that.set("photoListVisible", false);
            }
        }
    });
}(window));