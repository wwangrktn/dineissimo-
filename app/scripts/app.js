/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = (function () {

        // global error handling
        var showAlert = function (message, title, callback) {

            if (win.navigator.simulator) {
                win.alert(message);
            } else {
                navigator.notification.alert(message, callback, title, 'OK');
            }
        };

        var onDeviceReady = function () {
            if (!win.navigator.simulator) {
                navigator.splashscreen.hide();
            }
            win.addEventListener('erroring', function (e) {
                e.preventDefault();
                console.log("Error", e);
                var message = e.message + "' from " + e.filename + ":" + e.lineno;
                showAlert(message, 'Error occurred');
                return true;
            });

            win.app.storeStock.read();
        };

        //Initialize the KendoUI app
        var mobileApp = null;

        if (win.navigator.simulator) {
            mobileApp = new kendo.mobile.Application(document.body, { skin: "flat", initial: "views/menu.html" });
        } else {
            mobileApp = new kendo.mobile.Application(document.body, { skin: "flat", initial: "views/intro.html" });
        }

        // Create a single list of products, and use filters rather than having seperate ones for favorites, menu, and shopping cart
        var storeStock = new kendo.data.extensions.LocalStorageDataSource({
              /*  transport: {
                    read: {
                        url: "data/menu.json",
                        dataType: "json"
                    }
                },
                */itemBase: 'items-kendo',
                //autoSync: true,
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            title: { type: "string"},
                            description: { type: "string"},
                            price: { type: "number"},
                            imgSrc: { type: "string"},
                            favorited: { type: "boolean", defaultValue: false},
                            incart: { type: "boolean", defaultValue: false},
                            qty: { type: "number"},
                            itemPrice: { type: "number", defaultValue: 0}
                        }
                    }
                },
                aggregate: [ 
                    { field: "id", aggregate: "count" },
                    { field: "itemPrice", aggregate: "sum" }
                ]
            });

        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener("deviceready",  onDeviceReady);

        return {
            mobileApp: mobileApp,
            alert: showAlert,
            storeStock: storeStock
        };

    }());
}(window));