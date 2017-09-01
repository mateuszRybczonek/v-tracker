import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({

  model() {
    return RSVP.hash({
      user: this.store.findRecord('user', this.get('session.currentUser.uid')),
      newVessel: this.store.createRecord('vessel'),
    });
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    
    controller.set('vessel', model.newVessel);
  },

  actions: {
    saveVessel(newVessel) {
      const user = this.controller.get('model.user');
      newVessel.get('users').pushObject(user);
      newVessel.save().then(() => {
        user.get('vessels').pushObject(newVessel);
        user.save();
        this.transitionTo('users.vessels');
      });
    },

    willTransition() {
      this._super();
      this.controller.get('vessel').rollbackAttributes();
    }
  }
});
