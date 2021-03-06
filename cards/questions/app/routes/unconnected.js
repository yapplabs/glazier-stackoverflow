import card from 'card';

var UnconnectedRoute = Ember.Route.extend({
  actions: {
    connect: function() {
      var self = this;
      return card.consumers.authenticatedStackoverflowApi.request("connect").then(function() {
        self.transitionTo('questions');
      });
    }
  }
});

export default UnconnectedRoute;
