
var ChangeOwedView = Backbone.View.extend({
	currencyViews: [],

	initialize: function(options){
		var self = this;

	},

	render: function(){
		var self = this;
		this.$el.html('');
		if(this.collection){
			this.collection.each(function(model){
				var moneyView = new MoneyView({model: model});
				self.$el.append(moneyView.render().$el);
				
				moneyView.$el.on('click', function(){
					app.walletCollection.add(moneyView.model)
					self.collection.remove(moneyView.model);
					self.render();
				});
			});
		} else{
			console.error('render expects view to have a collection...');
		}

		return this;
	}
});