import card from 'card';
import Conductor from 'conductor';
import Question from 'app/models/question';

function fetch(repositoryName) {
  return Question.findAllByRepositoryName(repositoryName);
}

var ApplicationRoute = Ember.Route.extend({
  events: {
    currentUserChanged: function(user) {
      var applicationController = this.controllerFor('application'),
          repositoryName = this.cardDataStore.get('repositoryName');

      if (!user) {
        applicationController.set('model', []);
        return;
      }

      Question.findAllByRepositoryName(repositoryName).then(function(questions){
        applicationController.set('model', questions);
      }).then(null, Conductor.error);
    }
  },

  model: function(){
    if (!card.data.user) {
      return [];
    }

    var repositoryName = this.cardDataStore.get('repositoryName');
    return Question.findAllByRepositoryName(repositoryName);
  }
});

export default ApplicationRoute;
