/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    var favoriteFilter = { field: "favorited", operator: "eq", value: true },
        categoryFilter,
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

        initMenuView: function() {
            win.app.Menu.setupImageHandlers("#popular-list", "#popular-photo-list");
        },

        showMenuView: function() {
            win.app.mobileApp.hideLoading();
        },

        hideMenuView: function() {
            win.app.storeStock.sync();
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

                ds.sync();
            });
        },

        removeFromFavorites: function (e) {
            this.addToFavorites(e);
        },

        addToCart: function (e) {
            setTimeout(function() {
                e.preventDefault();
                var fromDs = win.app.Menu.dataSource.get(e.data.id);
                fromDs.set('incart', true);
                var newQ = fromDs.qty === undefined ? 1 : fromDs.qty + 1;
                fromDs.set('qty', newQ);
                fromDs.set('itemPrice', fromDs.qty * fromDs.price);
            });
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
                if (categoryFilter && categoryFilter.filters.length > 0) {
                    this.dataSource.filter(categoryFilter);
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

                categoryFilter = { logic: 'or', filters: [] };

                if (that.get('show.bbq')) {
                    categoryFilter.filters.push({field: "type", operator: "eq", value: "barbeque"}); 
                }

                if (that.get('show.drinks')) {
                    categoryFilter.filters.push({field: "type", operator: "eq", value: "drinks"});
                }
                
                if (that.get('show.sandwiches')) {
                    categoryFilter.filters.push({field: "type", operator: "eq", value: "sandwiches"});
                }
                
                if (that.get('show.desserts')) {
                    categoryFilter.filters.push({field: "type", operator: "eq", value: "desserts"});
                }

                //check to see if they are all not checked and create a filter that will return nothing
                if (categoryFilter.filters.length === 0) {
                    categoryFilter.filters.push({field: "type", operator: "eq", value: "unicorn"});
                }
                
                console.log(categoryFilter);

                that.dataSource.filter(categoryFilter);
            });
            
        }
    });
}(window));