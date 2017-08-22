import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['vessels-list-item'],

  firebaseApp: service(),
  storageRef: '',
  file: '',
  router: service('-routing'),

  imagePath: computed('vessel', 'session.currentUser.uid', function() {
    const vesselId = this.get('vessel.id');
    const userId = this.get('session.currentUser.uid');
    return `${userId}/vessels/${vesselId}.jpg`;
  }),

  imageUrl: computed('imagePath', function() {
    const storageRef = this.get('firebaseApp').storage().ref();
    storageRef.child(this.get('imagePath')).getDownloadURL().then((url) => {
      this.set('imageUrl', url);
    }).catch((error) => {
      switch (error.code) {
        case 'storage/object_not_found':
          break;
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    });
  }),

  actions: {
    transitionToEdit() {
      this.get('router').transitionTo('users.vessels.edit', [this.get('vessel.id')]);
    },
  }
});
