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
        var service = this;
        return card.consumers.userStorage.request('getItem', 'stackOverflowAccessToken').then(function(accessToken) {
          if (accessToken) return accessToken;

          var url = 'https://stackexchange.com/oauth/dialog';
          return service.request('authorize', {
            authorizeUrl: url
          }).then(function(accessToken) {
            // TODO this token expires...
            card.consumers.userStorage.request('setItem', 'stackOverflowAccessToken', accessToken).then(undefined, Conductor.error);
            return accessToken;
          });
        });
      }
    }),
    'fullXhr': Conductor.Oasis.Consumer,
    'authenticatedStackoverflowApi': AuthenticatedStackoverflowApiConsumer,
    'userStorage': Conductor.Oasis.Consumer
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

