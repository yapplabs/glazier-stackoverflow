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

var Repo = {
  /*
    @public

    Retrieves the current repository name.

    @method getCurrentRepositoryName
    @returns {Ember.RSVP.Promise}
  */
  getCurrentRepositoryName: function(){
    return Ember.RSVP.resolve(card.consumers.repository.request('getRepository'));
  }
};

function fetch() {
  return Ember.RSVP.hash({
    repositoryName: Repo.getCurrentRepositoryName()
  }).then(function(hash){
    hash.questions = Question.findAllByRepositoryName(hash.repositoryName);
    return Ember.RSVP.hash(hash);
  });
}

var ApplicationRoute = Ember.Route.extend({
  events: {
    currentUserChanged: function(user) {
      var applicationController = this.controllerFor('application');

      fetch().then(function(hash){
        applicationController.set('model', hash.questions);
      }).then(null, Conductor.error);
    }
  },

  model: function(){
    return fetch().then(function(hash) {
      return hash.questions;
    });
  }
});

export default ApplicationRoute;
