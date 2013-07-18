import Resolver from 'resolver';

var Application = Ember.Application.extend({
  modulePrefix: 'app',
  rootElement: '#card',
  resolver: Resolver,
  Router: Ember.Router
});

requireModule('templates');

export default Application;
