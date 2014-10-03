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

        favorites: new kendo.data.extensions.LocalStorageDataSource({
            itemBase: 'favorites-kendo',
            autoSync: true,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        title: { type: "string"},
                        description: { type: "string"},
                        price: { type: "number"},
                        imgSrc: { type: "string"}
                    }
                }
            }
        }),

        favoritesEmpty: true,

        photoListVisible: false,
        favoriteListVisible: false,
        favoritePhotoListVisible: false,
        inListView: true,
        title: "Menu",

        addToFavorites: function (e) {
            e.preventDefault();
            var fromDs = win.app.Menu.dataSource.get(e.data.id);
            if (!fromDs.favorited) {
                fromDs.set('favorited', true);
                win.app.Menu.favorites.add(fromDs);
                win.app.Menu.favorites.sync();
            }
            //Note: this is here until we figure out why sync on the ds didn't work
            $("#popular-list").data("kendoMobileListView").refresh();

            win.app.Menu.set("favoritesEmpty", false);
            if (win.app.Menu.photoListVisible) {
                win.app.Menu.set("favoritePhotoListVisible", true);
            } else {
                win.app.Menu.set("favoriteListVisible", true);
            }
        },

        addToCart: function (e) {
            e.preventDefault();
            var fromDs = win.app.Menu.dataSource.get(e.data.id);
            if (!fromDs.favorited) {
                fromDs.set('incart', true);
                fromDs.set('qty', 1);
                win.app.ShoppingCart.cart.add(fromDs);
                //win.app.ShoppingCart.cart.sync();
            }
            //Note: this is here until we figure out why sync on the ds didn't work
            $("#popular-list").data("kendoMobileListView").refresh();
            win.app.ShoppingCart.set("cartEmpty", false);
        },

        changeView : function (e) {
            var that = this;
            e.preventDefault();
            var icon = $('#view-changer .km-icon');
            if (icon.hasClass('km-th-large')) {
                icon.removeClass('km-th-large').addClass('km-list-bullet');
                that.set("photoListVisible", true);
                if (!that.favoritesEmpty) {
                    that.set("favoriteListVisible", false);
                    that.set("favoritePhotoListVisible", true);
                }
            } else {
                icon.removeClass('km-list-bullet').addClass('km-th-large');
                that.set("photoListVisible", false);
                if (!that.favoritesEmpty) {
                    that.set("favoritePhotoListVisible", false);
                    that.set("favoriteListVisible", true);
                }
            }
        }
    });
}(window));