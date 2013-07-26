var EditRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('tag', this.controllerFor('application').get('tag'));
  },
  adminStorageConsumer: function() {
    return this.container.lookup('consumer:adminStorage');
  }.property(),
  events: {
    saveTag: function() {
      var tag = this.controller.get('tag');
      this.controllerFor('application').set('tag', tag);
      this.get('adminStorageConsumer').request('setItem', 'tag', tag);
      this.transitionTo('index');
    }
  }
});

export default EditRoute;
