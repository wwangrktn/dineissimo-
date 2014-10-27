/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};
    
    win.app.Intro = kendo.observable({
        goToMenu: function() {
            app.mobileApp.showLoading();
            app.mobileApp.navigate("views/menu.html");
        },
        onShow: function() {
            $("#intro").click(function(e) {
               console.log("clicked " + $(e.target).height()); 
            });
        }
       
    });
}(window));