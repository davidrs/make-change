//collection of money models, to be extended by others..

var MoneyCollection = Backbone.Collection.extend({
	model: MoneyModel,
	calculateTotal: function(){
		return this.reduce(function(memo, value) { return memo + value.get('value') }, 0);
	},

	calculateTotalUpToBounds: function(upperBound){
		var total = 0;
		for(var i=0; i <= upperBound; i++){
			total += this.at(i).get('value');
		}

		return total;
	},

	calculateChange: function(totalDue){
		return this.calculateTotal() - totalDue;
	}



});