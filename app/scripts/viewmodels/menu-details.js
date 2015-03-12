/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.MenuDetails = kendo.observable({

        loaded: false,

        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/menu.json",
                    dataType: "json"
                }
            }
        }),

        hide: function() {
            win.app.MenuDetails.set( "loaded", false );
        },

        shareTweet: function(e) {
                   window.plugins.socialsharing.shareViaTwitter(
        “Terrific menu items from Dineissimo!”,
        “www/”+e.data.item.imgSrc,
        null,
        this.onSuccess, 
        this.onError
                );
        },
        shareFacebook: function(e) {
                    window.plugins.socialsharing.shareViaFacebook(
        “Terrific menu items from Dineissimo!”,
        “www/”+e.data.item.imgSrc,
        null,
        this.onSuccess, 
        this.onError
                   );
        },
        show: function (e) {
            var view = e.view;
            $( "#details-title" ).addClass( "invisible" );
            setTimeout(function() {
                win.app.Menu.dataSource.fetch(function () {
                    var model = view.model,
                        item = win.app.Menu.dataSource.get(view.params.id);
                    model.set("item", item);
                    everliveImages.responsiveAll();
                    
                    $("#detail-img").one("load", function(e) {
                        setTimeout(function() {
                            $( "#details-title" ).removeClass( "invisible" );
                            win.app.MenuDetails.set( "loaded", true );
                        }); 
                    });
                    
                });
            });
        },

        title: "Menu Details"
    });
}(window));
