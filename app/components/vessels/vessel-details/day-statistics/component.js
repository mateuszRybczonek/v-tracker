import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  dayStatsItems: computed('data', 'day', function() {
      return [
        {
          iconName: 'local-gas-station',
          header: `${this.get('data')
            .filterBy('reportTime', this.get('day'))
            .get('firstObject').data.foRob} cbm`,
          description: 'Remaining FO',
          customClass: 'icon-fo',
        },
        {
          iconName: 'local-gas-station',
          header: `${this.get('data')
            .filterBy('reportTime', this.get('day'))
            .get('firstObject').data.doRob} cbm`,
          description: 'Remaining DO',
          customClass: 'icon-do',
        },
        {
          iconName: 'local-drink',
          header: `${this.get('data')
            .filterBy('reportTime', this.get('day'))
            .get('firstObject').data.fwRob} cbm`,
          description: 'Remaining FW',
          customClass: 'icon-fw',
        },
      ];
    }
  ),
});
