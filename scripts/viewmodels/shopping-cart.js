/*jslint browser: true */
/*global app, kendo */

//View Model for the Shopping Cart page.
var app = app || {};

app.ShoppingCart = (function () {
    'use strict';

    return new kendo.observable({
        title: "Shopping Cart"
    });

}());