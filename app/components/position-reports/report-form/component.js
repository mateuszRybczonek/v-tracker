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

  actions: {
    back() {
      this.get('router').transitionTo('users.vessels.details', [this.get('report.vessel.id')]);
    },
  },
});
