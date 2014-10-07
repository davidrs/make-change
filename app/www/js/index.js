requirejs.config({
    paths: {
        "text" : "libs/text"
    }
});

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        this.currencyCollection = new CurrencyCollection(CURRENCY_CDN);
        console.log('this.currencyCollection ', this.currencyCollection );

        this.walletView = new WalletView({el: '#wallet-amount'});
        this.walletView.render();
        console.log('this.walletView', this.walletView);

        this.allMoneyView = new AllMoneyView({el: '#all-money', currency: this.currencyCollection});
        this.allMoneyView.render();
        console.log('this.allMoneyView', this.allMoneyView);

        this.amountOwedView = new AmountOwedView({el:'#amount-owed'});
        this.changeOwedView = new ChangeOwedView({el:'#change-expected'});


        $('#start-calculation').on('click', function(){
            var targetAmount = $('#amount-owed-text').val();
            if(targetAmount > 0){
                app.amountOwed = app.walletCollection.calculateAmountOwed(targetAmount);
                app.amountOwedView.render();

                var changeExpected = app.amountOwed.calculateChange(targetAmount);
                if(changeExpected > 0){
                    changeExpected = Math.round(changeExpected * 100) / 100
                    changeCollection = app.currencyCollection.calculateChangeCollection(changeExpected);
                    app.changeOwedView.collection = changeCollection;
                    app.changeOwedView.render();
                }
                
                
            } else {
                alert('Amount must be bigger than 0.');
            }
        });
    },


    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


$(document).delegate('#make-change-page', 'pageshow', function(){

});
