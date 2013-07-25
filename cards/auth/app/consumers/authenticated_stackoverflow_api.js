import Conductor from 'conductor';

/*
  Provides authenticated StackOverflow api access

  @class AuthenticatedStackoverflowApiConsumer
*/
var AuthenticatedStackoverflowApiConsumer = Conductor.Oasis.Consumer.extend({

  /*
    @public

    @property requests
    @type Object
  */
  requests: {

    /*
      @public

      @method connect
    */
    connect: function() {
      var card = this.card;
      return card.consumers.oauth.getAccessTokenPromise().then(function (results) {
        return !!(results && results.accessToken);
      });
    },

    /*
      @public

      @method connected
    */
    connected: function() {
      var card = this.card;
      return !!card.data.paneTypeUserEntries.stackOverflowAccessToken;
    },

    /*
      @public

      @method ajax
      @param ajaxOpts {Object}
    */
    ajax: function (ajaxOpts) {
      var card = this.card;

      return card.consumers.oauth.getAccessTokenPromise().then(function (results) {
        var accessToken = results.accessToken;
        if (!ajaxOpts.data) {
          ajaxOpts.data = {};
        }

        ajaxOpts.url = 'https://api.stackexchange.com' + ajaxOpts.url;
        ajaxOpts.data.access_token = accessToken;
        ajaxOpts.data.key = card.data.env.oauthKey;

        return card.consumers.fullXhr.request('ajax', ajaxOpts);
      }).then(null, Conductor.error);
    }
  }
});

export default AuthenticatedStackoverflowApiConsumer;
