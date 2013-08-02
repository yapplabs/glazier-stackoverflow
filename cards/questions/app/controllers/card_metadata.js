import RemoteEmberObjectMixin from 'glazier/remote-ember-object-mixin';

var CardMetadataController = Ember.Controller.extend(RemoteEmberObjectMixin, {
  needs: ['application'],
  cardDataStore: null, //injected
  application: Ember.computed.alias('controllers.application'),
  publishedProperties: [
    'isEditable',
    'isEditing'
  ],
  isEditable: Ember.computed.and('cardDataStore.isAdmin', 'application.user', 'application.connected')
});

export default CardMetadataController;
