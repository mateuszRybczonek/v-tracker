import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    if(this.get('session.isAuthenticated')) {
      this.transitionTo('users.vessels');
    } else {
      this.transitionTo('login');
    }
  }
});
