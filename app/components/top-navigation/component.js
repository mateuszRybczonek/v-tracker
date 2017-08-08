import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  router: service('-routing'),

  actions: {
    signOut() {
      this.get('session').close().then(() => {
        this.get('router').transitionTo('login');
      });
    },
  },
});
