
var MoneyModel = Backbone.Model.extend({
	defaults:{
		name:'loonie',
		type: 'coin',
		value: 1,
		img: '/img/tmp.jpg'
	},
	initialize: function (	){
		var self = this;
	},

});
