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
