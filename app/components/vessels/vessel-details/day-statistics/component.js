import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['day-statistics'],

  selectedDayData: computed('data', 'day', function() {
    return this.get('data')
      .filterBy('reportTime', this.get('day'))
      .get('firstObject');
  }),
  
  dayStatsItems: computed('selectedDayData', function() {
      return [
        {
          iconName: 'local-gas-station',
          header: `${this.get('selectedDayData').data.foRob} cbm`,
          description: 'Remaining FO',
          customClass: 'icon-fo',
        },
        {
          iconName: 'local-gas-station',
          header: `${this.get('selectedDayData').data.doRob} cbm`,
          description: 'Remaining DO',
          customClass: 'icon-do',
        },
        {
          iconName: 'local-drink',
          header: `${this.get('selectedDayData').data.fwRob} cbm`,
          description: 'Remaining FW',
          customClass: 'icon-fw',
        },
      ];
    }
  ),
});
