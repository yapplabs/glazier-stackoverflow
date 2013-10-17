import Resolver from 'resolver';

var Application = Ember.Application.extend({
  modulePrefix: 'app',
  rootElement: '#card',
  Resolver: Resolver,
  Router: Ember.Router
});

require('templates');

export default Application;
