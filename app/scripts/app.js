/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = (function () {

        // global error handling
        var showAlert = function (message, title, callback) {
            navigator.notification.alert(message, callback, title, 'OK');
        };

        win.addEventListener('error', function (e) {
            e.preventDefault();
            var message = e.message + "' from " + e.filename + ":" + e.lineno;
            showAlert(message, 'Error occurred');
            return true;
        });

        var onDeviceReady = function () {
            navigator.splashscreen.hide();
        };

        //Initialize the KendoUI app
        var mobileApp = new kendo.mobile.Application(document.body, { skin: "flat", initial: "views/menu.html" });

        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener("deviceready",  onDeviceReady);

        return {
            mobileApp: mobileApp
        };

    }());
}(window));