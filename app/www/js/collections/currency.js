
var CurrencyCollection = Backbone.Collection.extend({
	model: MoneyModel,
	initialize: function (	){
		var self = this;
		this.comparator = 'value';
	},

	//given a target change amount return a collection that matches..
	calculateChangeCollection: function(changeExpected){
		var changeOwed = new MoneyCollection();
		var upperBound = this.length - 1;

		for(var i = upperBound; i >= 0; i--){
			var model = this.at(i);

			if(model.get('value') <= changeExpected){
				changeOwed.add(model.clone());
				changeExpected -= model.get('value');
				i++;
			}
		}
		return changeOwed;
	}

});
