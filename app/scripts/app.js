/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = (function () {

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