import Conductor from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/ember_card_bridge.js');
Conductor.require('/vendor/loader.js');
Conductor.requireCSS('card.css');
Conductor.requireCSS('/css/glazier_card.css');

var card = Conductor.card({
  card: null,
  consumers: {
    'adminStorage': Conductor.Oasis.Consumer,
    'authenticatedStackoverflowApi': Conductor.Oasis.Consumer,
    'remoteEmberObject': Conductor.Oasis.Consumer.extend({
      controllers: ['cardMetadata'],
      updateData: function(bucketName, data) {
        this.send('updateData', { bucket: bucketName, data: data });
      },
      requests: {
        getBucketData: function(bucketName) {
          if (this.controllers.indexOf(bucketName) === -1) {
            throw new Error('Invalid bucket name ' + bucketName);
          } else {
            // FUTURE: maybe have the bucket-backing objects registered as bucket: types
            var controller = this.container.lookup('controller:' + bucketName);
            return controller.getBucketData();
          }
        }
      }
    })
  },

  render: function (intent, dimensions) {
    if (!document.getElementById('card')) {
      document.body.innerHTML = "<div id=\"card\"></div>";
    }

    return this.App.render(intent, dimensions);
  },

  activate: function() {
    Conductor.Oasis.configure('eventCallback', Ember.run);
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

