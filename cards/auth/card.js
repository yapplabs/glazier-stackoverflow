import Conductor from 'conductor';
import AuthenticatedStackoverflowApiConsumer from 'app/consumers/authenticated_stackoverflow_api';
var RSVP = Conductor.Oasis.RSVP;

Conductor.require('/vendor/jquery.js');
Conductor.requireCSS('card.css');

var card = Conductor.card({
  consumers: {
    'oauth': Conductor.Oasis.Consumer.extend({
      getAccessTokenPromise: function(){
        var now = +new Date();
        var accessToken = card.data.paneTypeUserEntries.stackOverflowAccessToken;
        var expiresAt = card.data.paneTypeUserEntries.stackOverflowAccessTokenExpiresAt;
        if (accessToken && expiresAt && expiresAt > now) {
          return RSVP.resolve(accessToken);
        }

        var url = 'https://stackexchange.com/oauth/dialog';
        return this.request('authorize', {
          authorizeUrl: url
        }).then(function(data) {
          var accessToken = data.access_token;
          var expires = data.expires; // seconds
          var expiresMs = expires * 1000;
          var expiresAt = now + expiresMs;

          var paneTypeUserStorage = card.consumers.paneTypeUserStorage;

          paneTypeUserStorage.request(
            'setItem', 'stackOverflowAccessToken', accessToken
          ).then(undefined, Conductor.error);

          paneTypeUserStorage.request(
            'setItem', 'stackOverflowAccessTokenExpiresAt', expiresAt
          ).then(undefined, Conductor.error);

          // TODO: this should happen automatically when we setItem above
          card.data.paneTypeUserEntries.stackOverflowAccessToken = accessToken;
          card.data.paneTypeUserEntries.stackOverflowAccessTokenExpiresAt = expiresAt;

          console.log('stackOverflowAccessTokenExpiresAt', expiresAt);

          return data;
        });
      }
    }),
    'fullXhr': Conductor.Oasis.Consumer,
    'authenticatedStackoverflowApi': AuthenticatedStackoverflowApiConsumer,
    'paneTypeUserStorage': Conductor.Oasis.Consumer
  },
  metadata: {
    document: function() {
      return {};
    },
    card: function() {
      return {};
    }
  }
});

export default card;

