import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['mini-stats'],

  miniStatsItems: computed('report', function() {
      return [
        {
          iconName: 'local-gas-station',
          header: `${this.get('report.foRob')} cbm`,
          description: 'Remaining FO',
          customClass: 'icon-fo',
        },
        {
          iconName: 'local-gas-station',
          header: `${this.get('report.doRob')} cbm`,
          description: 'Remaining DO',
          customClass: 'icon-do',
        },
        {
          iconName: 'local-drink',
          header: `${this.get('report.fwRob')} cbm`,
          description: 'Remaining FW',
          customClass: 'icon-fw',
        },
        {
          iconName: 'person-pin',
          header: `${this.get('report.pob')}`,
          description: 'POB',
          customClass: 'icon-pob'
        },
      ];
    }
  ),
});
