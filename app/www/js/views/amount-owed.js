

var AmountOwedView = Backbone.View.extend({
	currencyViews: [],

	initialize: function(options){
		var self = this;
	},

	render: function(){
		var self = this;
		this.$el.html('');
		app.amountOwed.each(function(model){
			console.log('model', model);
			var moneyView = new MoneyView({model: model});
			self.$el.append(moneyView.render().$el);
			
			moneyView.$el.on('click', function(){
				moneyView.model.destroy();
				//app.amountOwed.remove(moneyView.model);	
				self.render();			
			});
		});


		return this;
	}
});