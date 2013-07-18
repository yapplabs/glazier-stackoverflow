var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('questions');
  }
});

export default IndexRoute;
