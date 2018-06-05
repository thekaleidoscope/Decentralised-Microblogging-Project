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
      App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/qNjs8vdB2KGt3QSe53cG');
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
      App.listenForNewPosts();
      return App.render();




    });

    // return App.bindEvents();
  },

  listenForNewPosts: function()
  {
      var MessageInst;
      App.contracts.Microblogger.deployed().then(function(instance)
      {
         MessageInst=instance;
         instance.NewPost({},{fromBlock:'latest'}).watch(function(err,event)
            {
                 console.log("event triggered", event);
                 // Reload when a new post is recorded
                 // $('#exampleFormControlTextarea1').trigger('reset');
                App.render();
            });
        });

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
    {       var cardRow = $('#CardRows');
            cardRow.empty();



        for (var i = msgCount-1; i>=0; i--)
        {
          MessageInst.Messages(i).then(function(candidate)
          {
            var owner   = candidate[0];
            var id = candidate[1];
            var data = candidate[2];
            var year = candidate[3];
            var month = candidate[4];
            var day = candidate[5];
            var hour = candidate[6];
            var minute = candidate[7];
            var second = candidate[8];
            var name = candidate[9];
            var _date_time= day+"/"+month+"/"+year+" "+hour+"::"+minute+"::"+second;
            // Render candidate Result
            // $.getJSON('../Microblogger.json', function(data) {
            var cardRow = $('#CardRows');
            var cardTemplate = $('#cardTemplate');

              // for (i = 0; i < ; i ++) {

                cardTemplate.find('.text-secondary').text(owner);
                cardTemplate.find('#headText').text(name);
                cardTemplate.find('#largerText').text(data);
                cardTemplate.find('#smallText').text(_date_time);

                cardRow.append(cardTemplate.html());

            });
        }

        loader.hide();
        content.show();
      }).catch(function(error) {
        console.warn(error);
      });


  },

  login: function()
  {
      var MessageInst;
      var key=$('#inputPassword2').val();


      App.contracts.Microblogger.deployed().then(function(instance)
      {
          MessageInst = instance;
          return MessageInst.login(key,{ from: App.account });
      }).then(function(res)
      {
          var dialog=$("#loginsucc");
          dialog.show()
          setTimeout(function() { dialog.hide(); }, 2000);

      }).catch(function(err)
      {
          var dialog = $("#IncorrectPass");
          dialog.show();
          setTimeout(function() { dialog.hide(); }, 2000);


      });
  },

  createPost: function()
  {
      var MessageInst;

      var postData=$('#exampleFormControlTextarea1').val();

      App.contracts.Microblogger.deployed().then(function(instance) {
        MessageInst = instance;
        return MessageInst.PostMessage(postData,  { from: App.account } );
    }).then(function(res)
    {

        // Wait for votes to update
          $("#content").hide();
          $("#loader").show();
    }).catch(function(err) {

      var dialog = $("#postError");
      dialog.show();
      setTimeout(function() { dialog.hide(); }, 2000);
    });

        $('#exampleFormControlTextarea1')[0].reset();
    },

    register: function()
    {
        var MessageInst;
        var Username=$('#inputUsername').val();
        var key=$('#inputPassword3').val();


        App.contracts.Microblogger.deployed().then(function(instance)
        {
            MessageInst=instance;
            return MessageInst.register(Username,key, { from: App.account });
        }).then(function(res)
        {
            var dialog = $("#successreg");
            dialog.show();
            setTimeout(function() { dialog.hide(); }, 2000);

        }).catch(function(err)
        {
            var dialog = $("#alreadymember");
            dialog.show();
            setTimeout(function() { dialog.hide(); }, 2000);


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
