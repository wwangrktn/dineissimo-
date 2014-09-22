/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.ShoppingCart = kendo.observable({
        title: "Shopping Cart"
    });
}(window));