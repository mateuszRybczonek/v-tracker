import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  reportsSortOrder: ['reportTime:desc'],

  sortedReports: computed.sort('reports', 'reportsSortOrder')
});
