import card from 'card';
import Conductor from 'conductor';
import Question from 'app/models/question';

var ApplicationRoute = Ember.Route.extend({
  events: {
    currentUserChanged: function(user) {
      if (user) {
        return this.transitionTo('questions');
      } else {
        return this.transitionTo('unconnected');
      }
    },
    edit: Ember.K
  }
});

export default ApplicationRoute;
