/*jslint browser: true */
/*global app, kendo */

//View Model for the Videos page.
var app = app || {};

app.Videos = (function () {
    'use strict';

    return new kendo.observable({
        title: "Videos"
    });

}());