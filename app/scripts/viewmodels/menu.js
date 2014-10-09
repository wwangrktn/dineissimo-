/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Menu = kendo.observable({

        dataSource: win.app.storeStock,

        favoriteFilter: { field: "favorited", operator: "eq", value: true },
        popularList: null,
        showFavoriteView: function () {
            this.dataSource.filter(null);
            this.dataSource.filter(this.favoriteFilter);
            everliveImages.responsiveAll();
        },

        setupImageHandlers: function(selector) {
            $(selector).each(function() {
                $(this).data("kendoMobileListView")
                    .bind("dataBound", everliveImages.responsiveAll);
            });
        },

        popularInit: function() {
           /* console.log("start init");
              win.app.Menu.popularList = $("#popular-list").kendoMobileListView({
                dataSource: win.app.Menu.dataSource,
               template: $('#menuTemplate').html()
            }).data("kendoMobileListView");  
            console.log("end init");*/

            win.app.Menu.setupImageHandlers("#popular-list, #popular-photo-list");
        },

        favoritesInit: function() {
            win.app.Menu.setupImageHandlers("#favorite-list, #favorite-photo-list");
        },

        categoriesInit: function() {
            win.app.Menu.setupImageHandlers("#category-list, #category-photo-list");
        },

        showMenuView: function () {
            console.log("start show");
            win.app.Menu.dataSource.filter({});
            // win.app.Menu.popularList.refresh();
            console.log("end show");
            everliveImages.responsiveAll();
        },

        showCategoryView: function () {
            this.dataSource.filter(null);
            this.dataSource.sort({ field: "price", dir: "asc"});
            everliveImages.responsiveAll();
        },

        changeSort: function (e) {
            this.dataSource.sort({ field: "price", dir: e.currentTarget.value });
        },

        favoritesEmpty: true,
        photoListVisible: false,
        favoriteListVisible: false,
        favoritePhotoListVisible: false,
        inListView: true,
        title: "Menu",

        addToFavorites: function (e) {
            console.log("one");
            e.preventDefault();
            var fromDs = this.dataSource.get(e.data.id);
            if (!fromDs.favorited) {
                fromDs.set('favorited', true);
            }

            console.log("two");
            if (this.photoListVisible) {
                this.set("favoritePhotoListVisible", true);
            } else {
                this.set("favoriteListVisible", true);
            }

            console.log("three");
            this.dataSource.sync();
            console.log("four");
        },

        removeFromFavorites: function (e) {
            e.preventDefault();
            var fromDs = this.dataSource.get(e.data.id);
            if (fromDs.favorited) {
                fromDs.set('favorited', false);
            }

            if (this.dataSource.aggregates().id === undefined) {
                this.set("favoritesEmpty", true);

                //TODO: this isn't working exactly correct.
                this.dataSource.filter(this.favoriteFilter);
            }

            //TODO: sync the 
        },

        addToCart: function (e) {
            e.preventDefault();
            var fromDs = win.app.Menu.dataSource.get(e.data.id);
            fromDs.set('incart', true);
            var newQ = fromDs.qty === undefined ? 1 : fromDs.qty + 1;
            fromDs.set('qty', newQ);
            fromDs.set('itemPrice', fromDs.qty * fromDs.price);
            this.dataSource.sync();
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
            everliveImages.responsiveAll();
        },

        changeFilter : function () {

            var chargeFilter = {
                logic: 'or',
                filters: []
            };
            if ($("#filter-barbecue").is(":checked")) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "barbeque"}); 
            }
            if ($("#filter-drink").is(":checked")) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "drinks"});
            }
            if ($("#filter-sandwich").is(":checked")) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "sandwiches"});
            }
            if ($("#filter-dessert").is(":checked")) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "desserts"});
            }

            //check to see if they are all not checked and create a filter that will return nothing
            if (chargeFilter.filters.length === 0) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "unicorn"});
            }
            this.dataSource.filter(chargeFilter);
        }
    });
}(window));