/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Claim = (function () {

        //This will be replaced by the event handler for a live sync.
        var showThanks = function (e) {
            var view = e.view;
            //Navigate to the thanks page
            console.log('we have the view', view);
        };

        return new kendo.observable({
            showThanks: showThanks,
            title: "Claim your prize"
        });

    }());
}(window));