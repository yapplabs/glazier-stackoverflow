import RemoteEmberObjectMixin from 'glazier/remote-ember-object-mixin';

var CardMetadataController = Ember.Controller.extend(RemoteEmberObjectMixin, {
  needs: ['application'],
  cardDataStore: null, //injected
  application: Ember.computed.alias('controllers.application'),
  publishedProperties: [
    'isEditable',
    'isEditing',
    'toolbar'
  ],
  isEditable: Ember.computed.and('cardDataStore.isAdmin', 'application.user', 'application.connected'),
  numQuestions: null,
  toolbar: function(){
    var numQuestions = this.get('numQuestions');
    if (numQuestions) {
      return [ { text: '' + numQuestions + ' questions' }];
    } else {
      return [];
    }
  }.property('numQuestions')
});

export default CardMetadataController;
