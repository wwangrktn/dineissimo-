/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.ShoppingCart = ({
        dataSource: win.app.storeStock,
        cartEmpty: false,
        total: 0,

        refreshTotal: function () {

            win.app.ShoppingCart.dataSource.filter({ field: "incart", operator: "eq", value: true });
            //win.app.ShoppingCart.dataSource.sync();

            console.log('refreshing total', win.app.ShoppingCart.dataSource.data());
          /*  var ret = 0;
            $(win.app.ShoppingCart.dataSource.data()).each(function (index, obj) {
                ret += (obj.qty * obj.price);
            });
            win.app.ShoppingCart.set('total', parseFloat(ret).toFixed(2));
            */
        },
        removeOne: function (e) {
            var fromDs = this.dataSource.get(e.data.id);

            if (fromDs.qty > 1) {
                fromDs.set('qty', fromDs.qty - 1);
            }

            //Note: this is here until we figure out why sync on the ds didn't work
            $("#cart-list").data("kendoMobileListView").refresh();
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
            
            /*if (vm.cart.data().length === 0) {
                vm.set('cartEmpty', true);
            }*/
        }

    });
}(window));