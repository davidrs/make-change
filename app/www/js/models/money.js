
var MoneyModel = Backbone.Model.extend({
	defaults:{
		name:'loonie',
		type: 'coin',
		value: 1
	},
	initialize: function (	){
		var self = this;
	},

});
