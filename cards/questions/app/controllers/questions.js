var QuestionsController = Ember.ArrayController.extend({
 cardDataStore: null,
 canEdit: Ember.computed.alias('cardDataStore.isAdmin')
});

export default QuestionsController;
