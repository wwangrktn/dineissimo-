/*jslint browser: true */
/*global app, kendo */

//View Model for the edit profile page
var app = app || {};

app.EditProfile = (function () {
    "use strict";

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