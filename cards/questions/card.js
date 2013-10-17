import Conductor from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/ember_card_bridge.js');
Conductor.require('/vendor/resolver.js');

Conductor.requireCSS('/css/glazier_card.css');
Conductor.requireCSS('card.css');

import RemoteEmberObjectConsumer from 'app/consumers/remote_ember_object';
RemoteEmberObjectConsumer.controllers = [ 'cardMetadata' ];

var card = Conductor.card({
  App: null,
  consumers: {
    'remoteEmberObject': Conductor.Oasis.Consumer.extend(RemoteEmberObjectConsumer),
    'adminStorage': Conductor.Oasis.Consumer,
    'authenticatedStackoverflowApi': Conductor.Oasis.Consumer
  },

  render: function (intent, dimensions) {
    if (!document.getElementById('card')) {
      document.body.innerHTML = "<div id=\"card\"></div>";
    }

    return this.App.render(intent, dimensions);
  },

  activate: function() {
    window.App = this.App = require('app/application').create();

    this.App.Router.map(function() {
      this.route('questions');
      this.route('unconnected');
      this.route('edit');
    });

    this.App.deferReadiness();
    this.App.register('card:main', this, { instantiate: false });
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

