import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({

  model( {vessel_id} ) {
    return RSVP.hash({
      user: this.store.findRecord('user', this.get('session.currentUser.uid')),
      vessel: this.store.findRecord('vessel', vessel_id),
      newReport: this.store.createRecord('position-report'),
    });
  },

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.setProperties({
      'report': model.newReport,
      'vessel': model.vessel,
    });
  },

  actions: {
    saveReport(newReport) {
      const vessel = this.controller.get('vessel');

      newReport.set('vessel', vessel);

      newReport.save().then(() => {
        vessel.get('positionReports').pushObject(newReport);
        vessel.save();
        this.transitionTo('users.reports');
      });
    },

    willTransition() {
      this._super();
      this.controller.get('report').rollbackAttributes();
    }
  }
});
