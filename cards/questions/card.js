import Conductor from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/ember_card_bridge.js');
Conductor.require('/vendor/loader.js');
Conductor.requireCSS('card.css');
Conductor.requireCSS('/css/glazier_card.css');

import remoteEmberObjectConsumer from 'app/consumers/remote_ember_object';

remoteEmberObjectConsumer.controllers = [
  'cardMetadata'
];

var card = Conductor.card({
  card: null,
  consumers: {
    'adminStorage': Conductor.Oasis.Consumer,
    'authenticatedStackoverflowApi': Conductor.Oasis.Consumer,
    'remoteEmberObject': Conductor.Oasis.Consumer.extend(remoteEmberObjectConsumer)
  },

  render: function (intent, dimensions) {
    if (!document.getElementById('card')) {
      document.body.innerHTML = "<div id=\"card\"></div>";
    }

    return this.App.render(intent, dimensions);
  },

  activate: function() {
    var Application = requireModule('app/application');
    window.App = this.App = Application.create();

    App.Router.map(function() {
      this.route('questions');
      this.route('unconnected');
      this.route('edit');
    });

    App.deferReadiness();
    App.register('card:main', this, { instantiate: false });
  },
  metadata: {
    document: function() {
      return {
        title: "StackOverflow Questions"
      };
    }
  }
});

export default card;

