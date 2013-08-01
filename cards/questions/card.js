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
    'adminStorage': Conductor.Oasis.Consumer,
    'authenticatedStackoverflowApi': Conductor.Oasis.Consumer
  },

  render: function (intent, dimensions) {
    if (intent === 'edit') {
      var router = window.App.__container__.lookup('router:main');
      router.send('edit');
      return;
    }
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
      this.route('edit');
    });

    App.deferReadiness();
    App.register('card:main', this, { instantiate: false });
    Ember.keys(Object.getPrototypeOf(this.consumers)).forEach(function(name){
      App.register('consumer:' + name, this.consumers[name], { instantiate: false });
    }, this);
  },
  metadata: {
    document: function() {
      return {
        title: "StackOverflow Questions"
      };
    },
    card: function() {
      return {
        isEditable: true
      };
    }
  }
});

export default card;

