var UnconnectedController = Ember.ArrayController.extend({
  cardDataStore: null,
  user: Ember.computed.alias('cardDataStore.user')
});

export default UnconnectedController;
