/*jslint browser: true */
/*global app, kendo */
"use strict";

//View Model for the About Us page.

(function (win) {
    win.app = win.app || {};

    win.app.AboutUs = kendo.observable({
        phone: "1-888-365-2779",
        email: "support@telerik.com",
        twitter: "http://twitter.com/telerik",
        facebook: "http://facebook.com/telerik",
        blog: "http://blogs.telerik.com",
        title: "About us",
        lat: 42.374990,
        lng: -71.273825,
        mapUrl: "http://maps.googleapis.com/maps/api/staticmap?center=42.374990,-71.273825&zoom=11&size=320x150",
        description: "Opened Jul 2013, this cafe in downtown LA serves organic, gluten-free, and vegan food without added sugar, yeast, caffeine, or alcohol.  In early-2014 its menu added a few dairy options.",
        phoneLaunch: function () {
            win.open("tel://" + this.phone);
        },
        emailLaunch: function () {
            win.open("mailto://" + this.email);
        },
        directionLaunch: function () {
            win.open("maps://maps.apple.com/?q=" + this.lat + "," + this.lng);
        },
        blogLaunch: function () {
            win.open(this.blog, "_blank");
        },
        twitterLaunch: function () {
            win.open(this.twitter);
        },
        facebookLaunch: function () {
            win.open(this.facebook);
        }

    });
}(window));