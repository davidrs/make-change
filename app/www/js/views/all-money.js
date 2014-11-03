

var AllMoneyView = Backbone.View.extend({
	currencyViews: [],

	initialize: function(options){
		var self = this;

		this.currencyCollection = options.currency;
		this.currencyCollection.each(function(money){
			self.currencyViews.push(new MoneyView({model:money}));
		});
	},

	render: function(){
		var self = this;

		this.$el.html('');
		_.each(this.currencyViews, function(moneyView){
			self.$el.append(moneyView.render().$el);
			
			moneyView.$el.on('click', function(){
				app.walletCollection.add(moneyView.model.clone());
			});

		});

		return this;
	}
});