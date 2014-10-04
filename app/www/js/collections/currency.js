
var CurrencyCollection = Backbone.Collection.extend({
	model: MoneyModel,
	initialize: function (	){
		var self = this;

		this.initCanadianCurrency();
	},
	initCanadianCurrency: function(){

	}
});
