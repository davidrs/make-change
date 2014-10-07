
var WalletCollection = MoneyCollection.extend({
	model: MoneyModel,

	initialize: function (	){
		var self = this;
		this.comparator = 'value';
		this.loadFromStorage();
		this.on('add', this.saveToStroage);
		this.on('remove', function(){
			//model.destroy({silent:true});
		  self.saveToStroage();
		});
	},

	saveToStroage: function(){
		localStorage.setItem(this.storageName,  JSON.stringify(this.toJSON()));
	},

	loadFromStorage: function(){
		//localStorage.setItem(this.storageName,  '');
		var tmp =localStorage.getItem(this.storageName);
		if(tmp){
			this.reset(JSON.parse(tmp));
		}
	},


	calculateAmountOwed: function(targetAmount){
		var firstBillBigger = this.getFirstBillBigger(targetAmount);
		var posnOfFirstBiggest = this.indexOf(firstBillBigger);
		var amountOwed = new MoneyCollection();

		var upperBound = (posnOfFirstBiggest > -1 ? posnOfFirstBiggest-1 : this.length-1); 
		this.recursiveAmountOwed(targetAmount, upperBound, amountOwed);
		if(amountOwed.length == 0){
			if(posnOfFirstBiggest > -1){
				amountOwed.add(firstBillBigger);
				return amountOwed;
			} else {
				alert('not enough money');
			}
		}

		return amountOwed;
	},

	//TODO: current bug, it doesn't realize which ones in the model have been 'used'
	//almost fixed
	recursiveAmountOwed: function(targetAmount, upperBound, amountOwed){
		 console.log('start recursiveAmountOwed',targetAmount, upperBound, amountOwed );

		for(var i = upperBound; i >= 0; i--){
			var model = this.at(i);

				console.log(model.get('value') +'=='+ targetAmount);
			if(model.get('value') == targetAmount){
				amountOwed.add(model);
				return true;
			}
			else if(model.get('value') < targetAmount){
				console.log(model.get('value') +'<'+ targetAmount);
				console.log('this.calculateTotalUpToBounds(i)', this.calculateTotalUpToBounds(i));
				//if we can succeed this way proceed
				if(this.calculateTotalUpToBounds(i) >= targetAmount){
					targetAmount -= model.get('value');
					amountOwed.add(model);
					this.recursiveAmountOwed(targetAmount, i-1, amountOwed);
					return true;
				} else{
					break;
				}
			}
		}

		console.log('i', i);
		console.log('upperBound', upperBound);
		if( !(i+1 > upperBound)) {
			model = this.at(i+1);
			targetAmount -= model.get('value');
			amountOwed.add(model);
			return true;
		}

		return false;
	},

	getFirstBillBigger: function(targetAmount){
		var firstBillBigger = this.filter(function(model){
			return (model.get('value')>=targetAmount);
		});

		if(firstBillBigger.length > 0){
			firstBillBigger = firstBillBigger[0];
		}
		return firstBillBigger;
	}
});
