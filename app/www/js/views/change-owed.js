
var ChangeOwedView = Backbone.View.extend({
	currencyViews: [],

	initialize: function(options){
		var self = this;

	},

	render: function(){
		var self = this;
		this.$el.html('');
		if(this.collection.calculateTotal() > 0){
			this.$el.html('<h4 >Change Expected</h4>');
		} else{
			this.$el.html('<h4 style="background: #fde;" >No Change Expected</h4>');
		}

		return this;
	},


	// not used, since we can't gurantee type of change that will be given.
	renderExpectedChange: function(){
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