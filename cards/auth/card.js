import 'conductor' as Conductor;
import 'app/consumers/authenticated_stackoverflow_api' as AuthenticatedStackoverflowApiConsumer;

// If you need them, you can require additional vendored javascript files from Glazier:
Conductor.require('/vendor/jquery.js');
// Conductor.require('/vendor/handlebars.js');
// Conductor.require('/vendor/ember-latest.js');
// Conductor.require('/vendor/loader.js');

Conductor.requireCSS('card.css');

var card = Conductor.card({
  consumers: {
    'oauth': Conductor.Oasis.Consumer.extend({
      getAccessTokenPromise: function(){
        var url = 'https://stackexchange.com/oauth/dialog';
        return this.request('authorize', {
          authorizeUrl: url
        });
      }
    }),
    'fullXhr': Conductor.Oasis.Consumer,
    'authenticatedStackoverflowApi': AuthenticatedStackoverflowApiConsumer
  },

  render: function (intent, dimensions) {
    if (!dimensions) {
      dimensions = {
        width: 500,
        height: 300
      };
    }

    document.body.innerHTML = "<div id=\"card\">This will be hidden.</div>";
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

