App = {
  web3Provider: null,
  contracts: {},
   account: '0x0',

  init: function() {
    // Load  Messages

    // $.getJSON('../pets.json', function(data) {
    //   var petsRow = $('#petsRow');
    //   var cardTemplate = $('#cardTemplate');
    //
    //   for (i = 0; i < data.length; i ++) {
    //     cardTemplate.find('.panel-title').text(data[i].name);
    //     cardTemplate.find('img').attr('src', data[i].picture);
    //     cardTemplate.find('.pet-breed').text(data[i].breed);
    //     cardTemplate.find('.pet-age').text(data[i].age);
    //     cardTemplate.find('.pet-location').text(data[i].location);
    //     cardTemplate.find('.btn-adopt').attr('data-id', data[i].id);
    //
    //     petsRow.append(cardTemplate.html());
    //   }
    // });

    return App.initWeb3();
  },

  initWeb3: function() {


    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
      $.getJSON("Microblogger.json", function(microblog) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Microblogger = TruffleContract(microblog);
      // Connect provider to interact with contract
      App.contracts.Microblogger.setProvider(App.web3Provider);

    //  App.listenForEvents();

      return App.render();
    });

    // return App.bindEvents();
  },

  render: function()
  {
      var MessageInst;
      var loader = $("#loader");
      var content = $("#CardRow");

      loader.show();
      content.hide();

      // Load account data
      web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          App.account = account;
          $("#accountAddress").html("Account: " + account);
        }
      });

      // Load contract data
      App.contracts.Microblogger.deployed().then(function(instance) {
        MessageInst = instance;
        return MessageInst.msgCount();
    }).then(function(msgCount)
    {


        for (var i = msgCount-1; i>=0; i--)
        {
          MessageInst.Messages(i).then(function(candidate)
          {
            var owner   = candidate[0];
            var id = candidate[1];
            var data = candidate[2];
            var created = candidate[3];

            // Render candidate Result
            // $.getJSON('../Microblogger.json', function(data) {
            var cardRow = $('#CardRows');
            var cardTemplate = $('#cardTemplate');

              // for (i = 0; i < ; i ++) {
                cardTemplate.find('.card-header').text(owner);
                cardTemplate.find('.card-title').text(id);
                cardTemplate.find('.card-text').text(data);
                cardTemplate.find('.card-footer').text(created);

                cardRow.append(cardTemplate.html());

            });
        }

        loader.hide();
        content.show();
      }).catch(function(error) {
        console.warn(error);
      });
  }
};

  // bindEvents: function() {
  //   $(document).on('click', '.btn-adopt', App.handleAdopt);
  // },

  // markAdopted: function(adopters, account) {
  //   /*
  //    * Replace me...
  //    */
  // },
  //
  // handleAdopt: function(event) {
  //   event.preventDefault();
  //
  //   var petId = parseInt($(event.target).data('id'));
  //
  //   /*
  //    * Replace me...
  //    */
  // }


$(function() {
  $(window).load(function() {
    App.init();
  });
});
