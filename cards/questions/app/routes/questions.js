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
    var tag = this.controllerFor('application').get('tag');
    return Question.findAllByTag(tag);
  }
});

export default QuestionsRoute;
