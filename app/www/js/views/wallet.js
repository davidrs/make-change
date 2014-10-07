

var WalletView = Backbone.View.extend({

	initialize: function (options){
		var self = this;
		app.walletCollection = new WalletCollection();

		app.walletCollection.on('add', function(model){self.render()});
		app.walletCollection.on('remove', function(model){self.render()});

	},


	render: function(){
		var self = this;

		this.$el.html('');
		app.walletCollection.each(function(model){
			var moneyView = new MoneyView({model: model});
			self.$el.append(moneyView.render().$el);
			
			moneyView.$el.on('click', function(){
				app.walletCollection.remove(moneyView.model);
			});
		});

		$('.wallet-total').text(app.walletCollection.calculateTotal());
	}

});
