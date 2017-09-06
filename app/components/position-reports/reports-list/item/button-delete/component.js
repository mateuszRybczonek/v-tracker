import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),

  showPromptDialog: false,
  
  actions: {
    showPrompt() {
      this.set('showPromptDialog', true);
    },

    deleteReport(report) {
      const vessel = this.get('store').peekRecord('vessel', report.get('vessel.id'));
      vessel.get('positionReports').removeObject(report);
      vessel.save();
      report.destroyRecord();
    },

    closePromptDialog() {
      this.set('showPromptDialog', false);
    },
  }
});
