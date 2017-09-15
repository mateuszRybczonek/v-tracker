import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  reportsSortOrderDesc: ['reportTime:desc'],
  reportsSortOrderAsc: ['reportTime:asc'],

  sortedReportsDesc: computed.sort('vessel.positionReports', 'reportsSortOrderDesc'),
  sortedReportsAsc: computed.sort('vessel.positionReports', 'reportsSortOrderAsc'),

  lastReport: computed.reads('sortedReportsDesc.firstObject'),
});
