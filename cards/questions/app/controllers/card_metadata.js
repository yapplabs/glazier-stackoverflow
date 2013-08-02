import RemoteEmberObjectMixin from 'glazier/remote-ember-object-mixin';

var CardMetadataController = Ember.Controller.extend(RemoteEmberObjectMixin, {
  cardDataStore: null, //injected
  publishedProperties: [
    'isEditable'
  ],
  isEditable: Ember.computed.bool('cardDataStore.isAdmin')
});

export default CardMetadataController;
