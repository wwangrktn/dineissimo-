/*jslint browser: true */
/*global app, kendo */
"use strict";


(function (win) {
    win.app = win.app || {};

    function debug (data) {
        win.app.alert('got back' + JSON.stringify( data ));
    }

    win.app.EditProfile = kendo.observable({
        updatePhoto: function (e) {
            e.preventDefault();
            var that = this;
            win.navigator.camera.getPicture(
                success: function (data) {
                    win.app.alert("setting the profilePic to: " + data.file);
                    that.profile.set("profilePic", data.file);
                }, debug, { 
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA
            });
        },

        deletePhoto: function (e) {
            e.preventDefault();
            win.alert("You must uncomment the camera code (line:XXX) to enable this functionality");
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

        updateProfile: function (e) {
            e.preventDefault();
            var url = "https://194-TGP-611.mktorest.com/rest";

            url += "?email=" + this.profile.email + "&access_token=" + this.profile.access_token;

            $.post(url, function (data) {
                if (!data.success) {
                    win.app.alert("Request had " + data.errors.length + " errors.\nThe first one was: " + data.errors[0].message);
                } else {
                    win.app.alert("Success");
                }
            });

        },

        profile: {
            firstName: "Johnny",
            lastName: "Bravo",
            email: "johnny@bravocorp.com",
            profilePic: "styles/images/videoprofile.png",
            access_token: "7e2b0879-14fb-438f-bfe7-78ce01d42d09:sj"
        }
    });
}(window));