import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel(){
    if(!this.get('session.isAuthenticated')){
      this.transitionTo('application');
    }
  },

  model() {
    const currentUserUID = this.get('session.currentUser.uid');

    return this.store.findRecord('user', currentUserUID);
  }
});
