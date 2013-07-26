var ApplicationController = Ember.ArrayController.extend({
  cardDataStore: null,
  user: Ember.computed.alias('cardDataStore.user'),
  repositoryName: Ember.computed.alias('cardDataStore.repositoryName'),
  userDidChange: function() {
    this.send('currentUserChanged', this.get('user'));
  }.observes('user'),
  connected: false,
  defaultTag: function() {
    return this.get('repositoryName').split('/')[1];
  }.property('repositoryName'),
  tag: function() {
    var title = this.get('cardDataStore.paneEntries.tag');
    var defaultTitle = this.get('defaultTag');
    return title || defaultTitle;
  }.property('defaultTag', 'cardDataStore.paneEntries.tag')
});

export default ApplicationController;
