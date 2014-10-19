/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    var favoriteFilter = { field: "favorited", operator: "eq", value: true };

    win.app.Menu = kendo.observable({

        dataSource: win.app.storeStock,
        currentView: "popular",

        categoriesVisible: function() {
            return this.get("currentView") === "categories";
        },

        setupImageHandlers: function(selector) {
            $(selector).each(function() {
                $(this).data("kendoMobileListView")
                    .bind("dataBound", everliveImages.responsiveAll)
                    .bind("itemChange", everliveImages.responsiveAll);
            });
        },

        popularInit: function() {
            win.app.Menu.setupImageHandlers("#popular-list");
        },

        changeSort: function (e) {
            this.categoriesDataSource.sort({ field: "price", dir: e.currentTarget.value });
        },

        favoritesEmpty: true,
        photoListVisible: false,
        favoriteListVisible: false,
        favoritePhotoListVisible: false,
        inListView: true,
        title: "Menu",

        addToFavorites: function (e) {

            var that = this;

            e.preventDefault();

            var id = e.data.id;

            setTimeout(function() {

                // console.profile('Add To Favorites');

                var fromDs = that.dataSource.get(id);
                var favorited = fromDs.favorited;

                fromDs.set("favorited", !favorited);

                // if (that.photoListVisible) {
                //     that.set("favoritePhotoListVisible", true);
                // } else {
                //     that.set("favoriteListVisible", true);
                // }
            });
        },

        removeFromFavorites: function (e) {
            this.addToFavorites(e);
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
        
            var target = e.item.data("target");

            if (target === "popular") {
                this.dataSource.filter({});
            }
            if (target === "favorites") {
                this.dataSource.filter(favoriteFilter);    
            }

            this.set("currentView", target);
        },

        changeFilter : function () {

            var that = this;

            setTimeout(function() {

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
                
                that.dataSource.filter(chargeFilter);

            });

            
        }
    });
}(window));