/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    var favoriteFilter = { field: "favorited", operator: "eq", value: true },
        menuNav;

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
            win.app.Menu.setupImageHandlers("#popular-list", "#popular-photo-list");
        },

        changeSort: function (e) {
            this.dataSource.sort({ field: "price", dir: e.currentTarget.value });
        },

        title: "Menu",
        inListView: true,

        toggleListViews: function() {
            var inListView = this.get("inListView");
            this.set("inListView", !inListView);
        },

        addToFavorites: function (e) {

            var that = this;

            e.preventDefault();

            var id = e.data.id;

            setTimeout(function() {

                var fromDs = that.dataSource.get(id);
                var favorited = fromDs.favorited;

                fromDs.set("favorited", !favorited);
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
        
            menuNav = menuNav || $("#menu-navbar").data("kendoMobileNavBar");

            var target = e.item.data("target"),
                title = e.item.data("title"),
                currentFilter = this.dataSource.filter();

            if (target === "popular") {
                if (currentFilter) {
                    this.dataSource.filter({});
                }
            }
            if (target === "favorites") {
                this.dataSource.filter(favoriteFilter);    
            }
            if (target === "categories") {
                if (currentFilter) {
                    this.dataSource.filter({});
                }
            }

            this.set("currentView", target);
            menuNav.title(title);

        },

        show: {
            bbq: true,
            drinks: true,
            sandwiches: true,
            desserts: true
        },


        changeFilter : function (e) {

            var that = this;

            setTimeout(function(){

                var chargeFilter = {
                    logic: 'or',
                    filters: []
                };

                if (that.get('show.bbq')) {
                    chargeFilter.filters.push({field: "type", operator: "eq", value: "barbeque"}); 
                }

                if (that.get('show.drinks')) {
                    chargeFilter.filters.push({field: "type", operator: "eq", value: "drinks"});
                }
                
                if (that.get('show.sandwiches')) {
                    chargeFilter.filters.push({field: "type", operator: "eq", value: "sandwiches"});
                }
                
                if (that.get('show.desserts')) {
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