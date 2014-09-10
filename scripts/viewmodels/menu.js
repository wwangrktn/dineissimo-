/*jslint browser: true */
/*global app, kendo */

//View Model for the menu page.
var app = app || {};

app.Menu = (function () {
    'use strict';

    return new kendo.observable({
        title: "Menu",
    });

}());