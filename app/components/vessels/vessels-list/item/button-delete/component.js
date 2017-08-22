import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),

  showPromptDialog: false,
  
  actions: {
    showPrompt() {
      this.set('showPromptDialog', true);
    },

    deleteVessel(vessel) {
      const user = this.get('store').peekRecord('user', this.get('session.currentUser.uid'));
      user.get('vessels').removeObject(vessel);
      user.save();
      vessel.destroyRecord();
    },

    closePromptDialog() {
      this.set('showPromptDialog', false);
    },
  }
});
