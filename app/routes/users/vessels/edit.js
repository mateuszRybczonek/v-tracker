import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model(params) {
    return this.store.findRecord('vessel', params.vessel_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('vessel', model);
  },

  actions: {
    saveVessel(newVessel) {
      newVessel.updatedAt = new Date();
      newVessel.save().then(() => this.transitionTo('users.vessels'));
    },

    willTransition(transition) {

      let model = this.controller.get('model');

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
