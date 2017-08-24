import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  router: service('-routing'),
  
  actions: {
    transitionToVesselDetails(param) {
      this.get('router').transitionTo('users.vessels.details', [param]);
    }
  }
});
