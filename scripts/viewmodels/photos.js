/*jslint browser: true */
/*global app, kendo */

//View Model for the Photos page.
var app = app || {};

app.Photos = (function () {
    'use strict';

    return new kendo.observable({
        title: "Photos"
    });

}());