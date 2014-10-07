/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.ShoppingCart = ({
        dataSource: win.app.storeStock,
        refreshTotal: function () {
            win.app.ShoppingCart.dataSource.filter({ field: "incart", operator: "eq", value: true });
        },
        removeOne: function (e) {
            var fromDs = this.dataSource.get(e.data.id);

            if (fromDs.qty > 1) {
                fromDs.set('qty', fromDs.qty - 1);
            }
            this.refreshTotal();
        },
        addOne: function (e) {
            var fromDs = this.dataSource.get(e.data.id);
            fromDs.set('qty', fromDs.qty + 1);
            fromDs.set('itemPrice', fromDs.qty * fromDs.price);
            this.dataSource.sync();
        },
        remove: function (e) {
            var fromDs = this.dataSource.get(e.data.id);
            fromDs.set("incart", false);
            fromDs.set("qty", 0);
            this.dataSource.sync();
        }

    });
}(window));