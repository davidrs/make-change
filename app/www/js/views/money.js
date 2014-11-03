

var MoneyView = Backbone.View.extend({
	initialize: function(options){
		var self = this;
		this.model = options.model;
		_.bindAll(this,'render');
	},

	render: function(){
		var self = this;
		require(['text!templates/money.html'], function(template){
			self.$el.html(_.template(template, self.model.toJSON()));
		});

		return this;
	}
});