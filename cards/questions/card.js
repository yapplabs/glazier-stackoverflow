import 'conductor' as Conductor;

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/loader.js');
Conductor.requireCSS('/cards/stackoverflow-questions/card.css');
Conductor.requireCSS('/css/glazier_card.css');

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

    document.body.innerHTML = "<div id=\"card\"></div>";

    card.consumers.repository.getName().then(function(repositoryName){
      Ember.run(App, 'advanceReadiness');
      // Danger: infinite loop results if you "return App;" here
    });

    return App;
  },

  activate: function() {
    window.App = requireModule('app/application');
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

