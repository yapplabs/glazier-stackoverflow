import 'conductor' as Conductor;

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

      @method ajax
      @param promise {Conductor.Oasis.RSVP.Promise}
      @param ajaxOpts {Object}
    */
    ajax: function (promise, ajaxOpts) {
      var card = this.card;

      card.consumers.oauth.getAccessTokenPromise().then(function (accessToken) {

        if (!ajaxOpts.data) {
          ajaxOpts.data = {};
        }

        ajaxOpts.url = 'https://api.stackexchange.com' + ajaxOpts.url;
        ajaxOpts.data.access_token = accessToken;
        ajaxOpts.data.key = "Fas5EB8w4OrUF6xinTNW5Q(("; // TODO: make this configurable

        return card.consumers.fullXhr.request('ajax', ajaxOpts).
          then(function (data) { promise.resolve(data); });

      }).then(null, Conductor.error);
    }
  }
});

export = AuthenticatedStackoverflowApiConsumer;
