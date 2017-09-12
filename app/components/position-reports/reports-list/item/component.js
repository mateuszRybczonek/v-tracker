import Ember from 'ember';
import { decimalToDMS } from 'v-tracker/utils/coordinates-utils';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['reports-list-item'],
  router: service('-routing'),

  showPromptDialog: false,

  lat: computed('report.lat', function() {
    return decimalToDMS(this.get('report').data.lat, true);
  }),
 
  lng: computed('report.lng', function() {
    return decimalToDMS(this.get('report').data.lng, false);
  }),

  actions: {
    transitionToEdit(param) {
      this.get('router').transitionTo('users.vessels.reports.edit', [param]);
    },

    transitionToReportDetails(param) {
      this.get('router').transitionTo('users.vessels.reports.details', [param]);
    }
  },


});
