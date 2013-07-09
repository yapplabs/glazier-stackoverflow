import Resolver from 'resolver';

var Application = Ember.Application.extend({
  modulePrefix: 'app',
  rootElement: '#card',
  resolver: Resolver
});

requireModule('templates');

export default Application;
