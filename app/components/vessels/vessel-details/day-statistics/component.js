import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['day-statistics'],

  dayData: computed('data', 'day', function() {
    return this.get('data')
      .filterBy('reportTime', this.get('day'))
      .get('firstObject');
  }),
  
  dayStatsItems: computed('dayData', function() {
    const dayData = this.get('dayData');
      return [
        {
          iconName: 'local-gas-station',
          header: `${dayData.data.foRob} cbm`,
          description: 'Remaining FO',
          customClass: 'icon-fo',
        },
        {
          iconName: 'local-gas-station',
          header: `${dayData.data.doRob} cbm`,
          description: 'Remaining DO',
          customClass: 'icon-do',
        },
        {
          iconName: 'local-drink',
          header: `${dayData.data.fwRob} cbm`,
          description: 'Remaining FW',
          customClass: 'icon-fw',
        },
      ];
    }
  ),
});
