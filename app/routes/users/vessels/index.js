import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    const currentUserUID = this.get('session.currentUser.uid');
    const user = this.store.peekRecord('user', currentUserUID);

    return user.get('vessels').then((vessels) => {
      return vessels;
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      vessels: model,
    });
  },
});
