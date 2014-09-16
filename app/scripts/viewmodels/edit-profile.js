/*jslint browser: true */
/*global app, kendo */
"use strict";


(function (win) {
    win.app = win.app || {};

    win.app.EditProfile = (function () {

        var showEditProfile = function () {
            console.log("showing");
            $("#appDrawer").hide();
            $("#editProfileDrawer").show();
        };

        var hideEditProfile = function () {
            console.log("hiding");
            $("#appDrawer").show();
            $("#editProfileDrawer").hide();
        };

        return new kendo.observable({
            showEditProfile: showEditProfile,
            updatePhoto: hideEditProfile,
            deletePhoto: hideEditProfile
        });

    }());
}(window));