import card from 'card';

var Question = {
  /*
    @public

    Fetches all questions given a repository name.

    @method findAllByTag
    @param  tag {String}
    @returns {Ember.RSVP.Promise}
  */
  findAllByTag: function(tag) {
    var url = "/2.1/questions?order=desc&sort=creation&tagged=" + tag + "&site=stackoverflow";

    return card.consumers.authenticatedStackoverflowApi.request("ajax", {
      url: url,
      type: 'GET',
      dataType: 'json'
    }).then(function(data) {
      return data.items;
    }).then(null, function(reason) {
      console.log('user declined oauth for Question.findAllByTag?', reason);
      throw reason;
    });
  }
};

export default Question;
