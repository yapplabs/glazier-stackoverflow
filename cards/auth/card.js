import Conductor from 'conductor';
import AuthenticatedStackoverflowApiConsumer from 'app/consumers/authenticated_stackoverflow_api';
var RSVP = Conductor.Oasis.RSVP;

Conductor.require('/vendor/jquery.js');
Conductor.requireCSS('card.css');

var card = Conductor.card({
  consumers: {
    'oauth': Conductor.Oasis.Consumer.extend({
      getAccessTokenPromise: function(){
        var accessToken = card.data.paneTypeUserEntries.stackOverflowAccessToken;
        if (accessToken) {
          return RSVP.resolve(accessToken);
        }

        var url = 'https://stackexchange.com/oauth/dialog';
        return this.request('authorize', {
          authorizeUrl: url
        }).then(function(accessToken) {
          // TODO this token expires...
          card.consumers.paneTypeUserStorage.request('setItem', 'stackOverflowAccessToken', accessToken).then(undefined, Conductor.error);

          // TODO: this should happen automatically when we setItem above
          card.data.paneTypeUserEntries.stackOverflowAccessToken = accessToken; // this is a hack

          return accessToken;
        });
      }
    }),
    'fullXhr': Conductor.Oasis.Consumer,
    'authenticatedStackoverflowApi': AuthenticatedStackoverflowApiConsumer,
    'paneTypeUserStorage': Conductor.Oasis.Consumer
  }
});

export default card;

