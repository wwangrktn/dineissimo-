/*jslint browser: true */
/*global app, kendo */
"use strict";


(function (win) {
    win.app = win.app || {};

    win.app.EditProfile = kendo.observable({
        updatePhoto: function(e) {
            e.preventDefault();
            alert("You must uncomment the camera code (line:XXX) to enable this functionality");
        },

        deletePhoto: function(e) {
            e.preventDefault();
            alert("You must uncomment the camera code (line:XXX) to enable this functionality");
        },
        
        showEditProfile: function (e) {
            e.preventDefault();
            $("#appDrawer").hide();
            $("#editProfileDrawer").show();
        },

        hideEditProfile: function (e) {
            e.preventDefault();
            $("#appDrawer").show();
            $("#editProfileDrawer").hide();
        },

        profile: {
            firstName: "Johnny",
            lastName: "Bravo",
            email: "johnny@bravocorp.com",
            profilePic: "styles/images/videoprofile.png"
        }
    });
}(window));