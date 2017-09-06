import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model( {vessel_id} ) {
    return this.store.findRecord('vessel', vessel_id);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      vessel: model,
    });
  },
});
