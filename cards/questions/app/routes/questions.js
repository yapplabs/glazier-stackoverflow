import Question from 'app/models/question';
import TagInfo from 'app/models/tag_info';
import card from 'card';

var QuestionsRoute = Ember.Route.extend({
  activate: function() {
    this.controllerFor('application').set('connected', true);
  },

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
    return Ember.RSVP.hash({
      questions: Question.findAllByTag(tag),
      tagInfo: TagInfo.find(tag)
    });
  },

  setupController: function(controller, model){
    controller.set('content', model.questions);
    if (model.tagInfo) {
      this.controllerFor('cardMetadata').set('numQuestions', model.tagInfo.count);
    } else {
      this.controllerFor('cardMetadata').set('numQuestions', null);
    }
  },

  actions: {
    edit: function() {
      this.transitionTo('edit');
    }
  }
});

export default QuestionsRoute;
