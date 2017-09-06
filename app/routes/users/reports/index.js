import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    const currentUserUID = this.get('session.currentUser.uid');
    const user = this.store.peekRecord('user', currentUserUID);
    
    const allReports = [];

    user.get('vessels').then(vessels => {
      vessels.forEach(vessel => {
        vessel.get('reports').then(reports => {
          allReports.push(...reports)
        })
      });
    });

    return allReports;
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      reports: model,
    });
  },
});
