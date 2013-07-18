import Question from 'app/models/question';
import card from 'card';

var QuestionsRoute = Ember.Route.extend({

  beforeModel: function() {
    var self = this;
    return card.consumers.authenticatedStackoverflowApi.request("connected").then(function(connected) {
      if (!connected) {
        self.transitionTo('unconnected');
      }
    });
  },

  model: function(){
    var repositoryName = this.cardDataStore.get('repositoryName');
    return Question.findAllByRepositoryName(repositoryName);
  }
});

export default QuestionsRoute;
