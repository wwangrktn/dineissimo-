/*jslint browser: true */
/*global app, kendo */

//View Model for the claim your prize page
var app = app || {};

app.Claim = (function () {
    'use strict';

    //This will be replaced by the event handler for a live sync.
    var showThanks = function (e) {
        var view = e.view;
        //Navigate to the thanks page
    };

    return new kendo.observable({
        showThanks: showThanks,
        title: "Claim your prize"
    });

}());