

var WalletView = Backbone.View.extend({
	currencyViews: [],
	initialize: function (options){
		var self = this;
		app.walletCollection = new WalletCollection();

		app.walletCollection.on('add', function(model){self.addMoney(model)});

	},

	addMoney: function(model){
		console.log('this', this);
		console.log('model', model);
		this.currencyViews.push(new MoneyView({model: model}));
		this.render();
	},

	render: function(){
		var self = this;

		this.$el.html('');
		_.each(this.currencyViews, function(moneyView){
			self.$el.append(moneyView.render().$el);
			
			moneyView.$el.on('click', function(){
				console.log('clicked wallet');
			});

		});
	}

});
