import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['mini-stats'],

  miniStatsItems: computed('report', function() {
      return [
        {
          iconName: 'local-gas-station',
          header: this.get('report.foRob'),
          description: 'Remaining FO',
          customClass: 'icon-fo',
        },
        {
          iconName: 'local-gas-station',
          header: this.get('report.doRob'),
          description: 'Remaining DO',
          customClass: 'icon-do',
        },
        {
          iconName: 'local-drink',
          header: this.get('report.fwRob'),
          description: 'Remaining FW',
          customClass: 'icon-fw',
        },
        {
          iconName: 'directions-boat',
          header: this.get('report.foRob'),
          description: 'Distance last 24 hours',
          customClass: 'icon-distance'
        },
      ];
    }
  ),
});
