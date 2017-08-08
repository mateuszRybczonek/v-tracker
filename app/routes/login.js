import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    if(this.get('session.isAuthenticated')) {
      this.transitionTo('index');
    } else {
      this.transitionTo('login');
    }
  },

  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: provider,
      }).then((data) => {
        if(this.get('session.isAuthenticated')){
          let user = this.store.createRecord('user', {
            id: data.currentUser.uid,
            email: data.currentUser.email,
          });
          user.save();
          this.transitionTo('users');
        }
      });
    },
  },
});
