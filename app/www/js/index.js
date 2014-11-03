requirejs.config({
    paths: {
        "text" : "libs/text"
    }
});

var app = {
    // Application Constructor
    initialize: function() {
        
        this.initFastClick();
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

        // TODO: calculation should start on text loss of focus
        $('#start-calculation').on('click', function(){
            var targetAmount = $('#amount-owed-text').val();
            if(targetAmount > 0){
                app.amountOwed = app.walletCollection.calculateAmountOwed(targetAmount);
                app.amountOwedView.render();

                var changeExpected = app.amountOwed.calculateChange(targetAmount);
                changeExpected = Math.round(changeExpected * 100) / 100
                changeCollection = app.currencyCollection.calculateChangeCollection(changeExpected);
                app.changeOwedView.collection = changeCollection;
                app.changeOwedView.render();
                $('#pay-results').show();
                
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

    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
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


$(document).delegate('#make-change-page', 'pagebeforeshow', function(){
    // Clear change
    $('#pay-results').hide();
    $('#amount-owed-text').val('');
    app.amountOwed = new MoneyCollection();
    app.amountOwedView.render();
    app.changeOwedView.collection = new MoneyCollection();
    app.changeOwedView.render();
});

// TODO: give text input focus on page load.
$(document).delegate('#make-change-page', 'pageshow', function(){
    $('#amount-owed-text').focus();
});

// Optional: reset text input on focus:
// $('#amount-owed-text').on('focus', function(){
//     $(this).val('');
// });
