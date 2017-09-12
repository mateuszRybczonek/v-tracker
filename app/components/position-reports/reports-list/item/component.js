import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['reports-list-item'],
  router: service('-routing'),

  showPromptDialog: false,

  lat: computed('report.lat', function() {
    return this._decimalToDMS(this.get('report').data.lat, true);
  }),
 
  lng: computed('report.lng', function() {
    return this._decimalToDMS(this.get('report').data.lng, false);
  }),

  actions: {
    transitionToEdit(param) {
      this.get('router').transitionTo('users.vessels.reports.edit', [param]);
    },

    transitionToReportDetails(param) {
      this.get('router').transitionTo('users.vessels.reports.details', [param]);
    }
  },

  _decimalToDMS(decimal, latitude = true, degrees = 0, minutes = 0, seconds = 0, direction = 'X') {
    if(latitude && decimal < 0) {
      direction = 'S';
    }
    else if(!latitude && decimal < 0) {
      direction = 'W';
    }
    else if(!latitude) {
      direction = 'E';
    } else {
      direction = 'N';
    }

    const d = Math.abs(decimal);
    degrees = Math.floor(d);

    seconds = (d - degrees) * 3600;

    minutes = (Math.round(seconds / 60 * 10) / 10).toFixed(1);

    let formattedDegree = null;

    if (latitude) {
      formattedDegree = `${('0' + degrees).slice(-2)}${String.fromCharCode(176)}`;
    } else {
      formattedDegree = `${('00' + degrees).slice(-3)}${String.fromCharCode(176)}`;
    }

    const formattedMinutes = `${('0' + minutes).slice(-4)}'`;

    return `${formattedDegree} ${formattedMinutes} ${direction}`;
  }
});
