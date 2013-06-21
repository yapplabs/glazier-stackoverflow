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

      card.getAccessTokenPromise().then(function (accessToken) {

        if (!ajaxOpts.data) {
          ajaxOpts.data = {};
        }

        ajaxOpts.url = 'https://api.stackexchange.com' + ajaxOpts.url;
        ajaxOpts.data.access_token = accessToken;

        return card.consumers.fullXhr.request('ajax', ajaxOpts).
          then(function (data) { promise.resolve(data); });

      }).then(null, Conductor.error);
    }
  }
});

export = AuthenticatedStackoverflowApiConsumer;
