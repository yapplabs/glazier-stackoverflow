import card from 'card';

var Question = {
  /*
    @public

    Fetches all questions given a repository name.

    @method findAllByRepositoryName
    @param  repositoryName {String}
    @returns {Ember.RSVP.Promise}
  */
  findAllByRepositoryName: function(repositoryName) {
    var tag = repositoryName.split("/")[1];
    var url = "/2.1/questions?order=desc&sort=creation&tagged=" + tag + "&site=stackoverflow";
    return card.consumers.authenticatedStackoverflowApi.request("ajax", {
      url: url,
      type: 'GET',
      dataType: 'json'
    }).then(function(data) {
      return data.items;
    }).then(null, function(reason) {
      console.log('user declined oauth for Question.findAllByRepositoryName?', reason);
      throw reason;
    });
  }
};

export default Question;
