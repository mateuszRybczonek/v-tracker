import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model( {position_report_id} ) {
    return this.store.findRecord('position-report', position_report_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('report', model);
  },

  renderTemplate( {position_report_id} ) {
    this.render('users/vessels/reports/new', position_report_id);
  },

  actions: {
    saveReport(report) {
      report.updatedAt = new Date();
      report.save().then(() => this.transitionTo('users.vessels.details', report.get('vessel.id')));
    },

    willTransition(transition) {
      const model = this.controller.get('report');

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
