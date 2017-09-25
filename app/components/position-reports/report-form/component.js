import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  router: service('-routing'),

  classNames: ['new-form'],

  isInvalid: computed.not('report.isValid'),

  dateValidation: [{
    message: 'Please provide date in a valid format (years range 1950-2099)',
    validate: (inputValue) => {
      let datePattern = /(19[5-9]\d|20[0-9]\d|2090)[/\-][0-1][1-2][/\-][0-2]?[0-9]|[3]?[0-1]/;
      return datePattern.test(inputValue);
    }
  }],

  latValidation: [{
    message: 'Please provide latitude in a valid format (dd mm.m), + for N / - for S hemisphere',
    validate: (inputValue) => {
      let latPattern = /([0-8][0-9]|90)\s([0-5][0-9].[0-9])\s('N'||'S')/;
      return latPattern.test(inputValue);
    }
  }],
  
  lngValidation: [{
    message: 'Please provide longitude in a valid format (ddd mm.m), + for E / - for W hemisphere',
    validate: (inputValue) => {
      let lngPattern = /([0-1][0-9][0-9]|180)\s([0-5][0-9].[0-9])\s('E'||'W')/;
      return lngPattern.test(inputValue);
    }
  }],

  actions: {
    back() {
      this.get('router').transitionTo('users.vessels.details', [this.get('report.vessel.id')]);
    },
  },
});
