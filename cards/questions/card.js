import 'conductor' as Conductor;

// If you need them, you can require additional vendored javascript files from Glazier:
Conductor.require('/vendor/jquery.js');
// Conductor.require('/vendor/handlebars.js');
// Conductor.require('/vendor/ember-latest.js');
// Conductor.require('/vendor/loader.js');

Conductor.requireCSS('card.css');

var card = Conductor.card({
  consumers: {
    'repository': Conductor.Oasis.Consumer.extend({
      getName: function(){
        return this.request('getRepository');
      }
    }),
    'authenticatedStackoverflowApi': Conductor.Oasis.Consumer
  },

  render: function (intent, dimensions) {
    if (!dimensions) {
      dimensions = {
        width: 500,
        height: 300
      };
    }

    card.consumers.repository.getName().then(function(repositoryName){
      document.body.innerHTML = "<div id=\"card\">To load StackOverflow questions for " + repositoryName + ". Click me.</div>";
      $('#card').click(function() {
          var tag = card.repositoryName.split("/")[1];
          var url = "/2.1/questions?order=desc&sort=creation&tagged=ember.js&site=stackoverflow";
          card.consumers.authenticatedStackoverflowApi.request("ajax", {
            url: url,
            type: 'GET',
            dataType: 'json'
          }).then(function(questions){
            $('#card').text(JSON.stringify(questions));
          }).then(undefined, Conductor.error);
      });
    }).then(undefined, Conductor.error);
  },

  activate: function() {
  },

  resize: function(dimensions) {
    var width = Math.min(dimensions.width, 500);
    var height = Math.min(dimensions.height, 500);

    $('body>div').css({
      width: width
    });
  }
});

export = card;

