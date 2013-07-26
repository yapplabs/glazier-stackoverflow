import Conductor from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/ember_card_bridge.js');
Conductor.require('/vendor/loader.js');
Conductor.requireCSS('card.css');
Conductor.requireCSS('/css/glazier_card.css');

var card = Conductor.card({
  consumers: {
    'authenticatedStackoverflowApi': Conductor.Oasis.Consumer
  },

  render: function (intent, dimensions) {
    document.body.innerHTML = "<div id=\"card\"></div>";
    Ember.run(App, 'advanceReadiness');
  },

  activate: function() {
    Conductor.Oasis.configure('eventCallback', Ember.run);
    var Application = requireModule('app/application');
    window.App = Application.create();

    App.Router.map(function() {
      this.route('questions');
      this.route('unconnected');
    });

    App.deferReadiness();
    App.register('card:main', this, { instantiate: false });
  }
});

export default card;

