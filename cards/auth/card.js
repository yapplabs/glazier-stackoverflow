import Conductor from 'conductor';
import AuthenticatedStackoverflowApiConsumer from 'app/consumers/authenticated_stackoverflow_api';

Conductor.require('/vendor/jquery.js');
Conductor.requireCSS('/cards/stackoverflow-auth/card.css');

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
        width: 0,
        height: 0
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

