import Conductor from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/ember_card_bridge.js');
Conductor.require('/vendor/loader.js');
Conductor.requireCSS('/cards/stackoverflow-questions/card.css');
Conductor.requireCSS('/css/glazier_card.css');

var card = Conductor.card({
  consumers: {
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

    Ember.run(App, 'advanceReadiness');

    return App;
  },

  activate: function() {
    var Application = requireModule('app/application');
    window.App = Application.create();
    App.deferReadiness();
    App.register('card:main', this, { instantiate: false });
  },

  resize: function(dimensions) {
    var width = Math.min(dimensions.width, 500);
    var height = Math.min(dimensions.height, 500);

    $('body>div').css({
      width: width
    });
  }
});

export default card;

