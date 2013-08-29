import card from 'card';

var TagInfo = {
  /*
    @public

    Fetches all questions given a repository name.

    @method findAllByTag
    @param  tag {String}
    @returns {Ember.RSVP.Promise}
  */
  find: function(tag) {
    var url = "/2.1/tags/" + tag + "/info?order=desc&sort=popular&site=stackoverflow";
    return card.consumers.authenticatedStackoverflowApi.request("ajax", {
      url: url,
      type: 'GET',
      dataType: 'json'
    }).then(function(data) {
      if (data.items && data.items.length > 0) {
        return data.items[0];
      }
    }).then(null, function(reason) {
      console.log('Falied to retrieve tag info for ' + tag, reason);
      throw reason;
    });
  }
};

export default TagInfo;
