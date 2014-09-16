/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.ShoppingCart = (function () {

        return new kendo.observable({
            title: "Shopping Cart"
        });

    }());
}(window));