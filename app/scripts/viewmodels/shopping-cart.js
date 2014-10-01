/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.ShoppingCart = kendo.observable({
        title: "Shopping Cart",
        cart: new kendo.data.DataSource({
            data: [
                {
                    "id": 1,
                    "title": "Lobster Roll",
                    "description": "Chef Michael Serpa and crew pack them in every day from lunch 'til close to get a taste of their delicious oysters and the best, most simply incredible Maine lobser roll in the city.  We prefer ours cold with mayout. Something, something Star Wars...",
                    "price": 14.25,
                    "imgSrc": "styles/images/static-data/lobsterRoll.png",
                    "qty": 2
                },
                {
                    "id": 2,
                    "title": "Chicken",
                    "description": "Chef Michael Serpa and crew pack them in every day from lunch 'til close to get a taste of their delicious oysters and the best, most simply incredible Maine lobser roll in the city.  We prefer ours cold with mayout. Something, something Star Wars...",
                    "price": 14.25,
                    "imgSrc": "styles/images/static-data/chicken.png",
                    "qty": 1
                },
                {
                    "id": 3,
                    "title": "Crab Cakes",
                    "description": "Chef Michael Serpa and crew pack them in every day from lunch 'til close to get a taste of their delicious oysters and the best, most simply incredible Maine lobser roll in the city.  We prefer ours cold with mayout. Something, something Star Wars...",
                    "price": 14.25,
                    "imgSrc": "styles/images/static-data/crabCake.png",
                    "qty": 3
                }
            ]
        }),
        total: function() {
            var ret = 0;
            $(win.app.ShoppingCart.cart.data()).each(function (index, obj) {
                
                ret += (obj.qty * obj.price);
            });
            return ret;
        },
        removeOne: function (e) {
            var fromDs = win.app.ShoppingCart.cart.get(e.data.id);

            if (fromDs.qty > 1) {
                fromDs.set('qty', fromDs.qty - 1);
            }
            win.app.ShoppingCart.refresh();
        },
        addOne: function (e) {
            var fromDs = win.app.ShoppingCart.cart.get(e.data.id);
            fromDs.set('qty', fromDs.qty + 1);
        },
        remove: function (e) {
            var fromDs = win.app.ShoppingCart.cart.get(e.data.id);
            win.app.ShoppingCart.cart.remove(fromDs);
        }

    });
}(window));