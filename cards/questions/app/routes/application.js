import card from 'card';
import Conductor from 'conductor';

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
    });
  }
};

function fetch(repositoryName) {
  return Question.findAllByRepositoryName(repositoryName);
}

var ApplicationRoute = Ember.Route.extend({
  events: {
    currentUserChanged: function(user) {
      var applicationController = this.controllerFor('application'),
          repositoryName = this.cardDataStore.get('repositoryName');

      Question.findAllByRepositoryName(repositoryName).then(function(hash){
        applicationController.set('model', hash.questions);
      }).then(null, Conductor.error);
    }
  },

  model: function(){
    var repositoryName = this.cardDataStore.get('repositoryName');
    return Question.findAllByRepositoryName(repositoryName);
  }
});

export default ApplicationRoute;
