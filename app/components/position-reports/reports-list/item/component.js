import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['reports-list-item'],
  router: service('-routing'),
  store: service(),

  showPromptDialog: false,

  actions: {
    transitionToEdit(param) {
      this.get('router').transitionTo('users.vessels.reports.edit', [param]);
    },

    transitionToReportDetails(param) {
      this.get('router').transitionTo('users.vessels.reports.details', [param]);
    }
  },
});
