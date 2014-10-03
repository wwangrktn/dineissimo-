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
            if (win.navigator.simulator) {
                navigator.splashscreen.hide();
            }
            win.addEventListener('error', function (e) {
                e.preventDefault();
                var message = e.message + "' from " + e.filename + ":" + e.lineno;
                showAlert(message, 'Error occurred');
                return true;
            });
        };

        //Initialize the KendoUI app
        var mobileApp = null;

        if (!win.navigator.simulator) {
            mobileApp = new kendo.mobile.Application(document.body, { skin: "flat", initial: "views/menu.html" });
        } else {
            mobileApp = new kendo.mobile.Application(document.body, { skin: "flat", initial: "views/intro.html" });
        }

        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener("deviceready",  onDeviceReady);

        return {
            mobileApp: mobileApp,
            alert: showAlert
        };

    }());
}(window));