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

      const formattedLat = this._formatLat(newReport);
      const formattedLng = this._formatLng(newReport);

      newReport.setProperties({
        vessel,
        lat: formattedLat,
        lng: formattedLng,
      });

      newReport.save().then(() => {
        vessel.get('positionReports').pushObject(newReport);
        vessel.save();
        this.transitionTo('users.vessels.details', vessel.get('id'));
      });
    },

    willTransition() {
      this._super();
      this.controller.get('report').rollbackAttributes();
    }
  },

  _formatLat(report){
    const latArray = report.get('lat').split(' ');
    if (latArray[2] === 'S') {
      return (-Number(latArray[0]) - Number(latArray[1]/60)).toFixed(3);
    } else {
      return (Number(latArray[0]) + Number(latArray[1]/60)).toFixed(3);
    }
  },

  _formatLng(report){
    const lngArray = report.get('lng').split(' ');
    if (lngArray[2] === 'W') {
      return (-Number(lngArray[0]) - Number(lngArray[1]/60)).toFixed(3);
    } else {
      return (Number(lngArray[0]) + Number(lngArray[1]/60)).toFixed(3);
    }
}
});
