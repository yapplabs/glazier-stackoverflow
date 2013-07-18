var ApplicationController = Ember.ArrayController.extend({
  cardDataStore: null,
  user: Ember.computed.alias('cardDataStore.user'),
  userDidChange: function() {
    this.send('currentUserChanged', this.get('user'));
  }.observes('user'),
  connected: false
});

export default ApplicationController;
