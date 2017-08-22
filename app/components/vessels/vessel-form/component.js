import Ember from 'ember';

const { Component, computed, inject: { service }, $ } = Ember;

export default Component.extend({

  router: service('-routing'),
  firebaseApp: service(),
  storageRef: '',
  file: '',

  classNames: ['new-form'],

  progress: 0,

  progressValue: computed.alias('progress'),

  formattedProgressValue: computed('progressValue', function() {
    return `${(this.get('progressValue') * 100).toFixed(0)}%`;
  }),

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

  isInvalid: computed.not('vessel.isValid'),

  actions: {
    didSelectImage(files) {
      const vessel = this.get('vessel');
      const vesselId = vessel.get('id');
      const userId = this.get('session.currentUser.uid');
      const reader = new FileReader();
      const component = this;
      component.set('uploadInProgress', true);

      reader.readAsDataURL(files[0]);
      this.set('file', files[0]);
      const file = this.get('file');
      const fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();
      const metadata = {
        contentType: file.type,
      };
      const storageRef = this.get('firebaseApp').storage().ref();
      const path = `${userId}/vessels/${vesselId}.${fileExtension}`;

      const uploadTask = storageRef.child(path).put(file, metadata);

      uploadTask.on('state_changed', (snapshot) => {
        component.set('progress', (snapshot.bytesTransferred / snapshot.totalBytes));
      }, function() {
      }, function() {
        component.set('uploadInProgress', false);
        $('.upload-successful').show(1000);
      });
    },

    back() {
      this.get('router').transitionTo('users.vessels');
    },
  },
});
