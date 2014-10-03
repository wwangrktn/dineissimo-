/*jslint browser: true */
/*global app, kendo, Camera */
"use strict";


(function (win) {
    win.app = win.app || {};

    var defaultPic = "styles/images/videoprofile.png";

    win.app.EditProfile = kendo.observable({
        updatePhoto: function (e) {
            e.preventDefault();
            var that = this;
            win.navigator.camera.getPicture(
                function (data) {
                    that.profile.set("profilePic", data);
                },
                function (data) {
                    win.app.alert("error: " + data);
                },
                {
                    quality: 50,
                    targetWidth: 80,
                    targetHeight: 80,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA
                }
            );
        },

        deletePhoto: function (e) {
            e.preventDefault();
            this.profile.set("profilePic", defaultPic);
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
            var url = "https://194-TGP-611.mktorest.com/rest?email=" + this.profile.email + "&access_token=" + this.profile.access_token;

            if (!win.navigator.simulator) {
                win.app.alert("Sorry, but you must run this on the device to recieve the prize");
            } else if (this.profile.profilePic !== defaultPic) {
                win.app.alert("Sorry, but you must change your profile picture to recieve the prize");
            } else {
                $.post(url, function (data) {
                    console.log("data", data);
                    if (!data.success) {
                        win.app.alert("Request had " + data.errors.length + " errors.\nThe first one was: " + data.errors[0].message);
                    } else {
                        win.app.alert("Success");
                    }
                });
            }

        },

        profile: {
            firstName: "Johnny",
            lastName: "Bravo",
            email: "johnny@bravocorp.com",
            profilePic: defaultPic,
            access_token: "51e12f1d-9be8-4ea3-8c8a-c76e84135b67:sj"
        }
    });
}(window));