define(["dojo/_base/declare", "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/currency", "dojo/router",
    "dojo/text!./_templates/ProductRow.html"],
    function (declare, _WidgetBase,
        _TemplatedMixin,
        currency, router,
        template) {

        var ProductRow = declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,

            product: null,

            postCreate: function(){
                if (this.product) {
                    this.name.innerText = this.product.name;
                    this.quantity.innerText = this.product.quantity;
                    this.price.innerText = currency.format(this.product.price, {
                        currency: "USD"
                    });
                }
            },

            doEdit: function () {
                router.go("/products/" + this.product.id);
            }
        });

        return ProductRow;
    }
);