import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(function() {});
  },
});
