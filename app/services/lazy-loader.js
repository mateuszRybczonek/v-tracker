import Ember from 'ember';

const { Service, RSVP, inject: { service }, run } = Ember;

/* eslint-disable max-len */
const GOOGLE_MAP_URL = '//maps.google.com/maps/api/js?v=3.23&sensor=false&client=&key=AIzaSyAcpHQzH108aO_4Ea9cS4zT5PTBqpopd8Q&libraries=geometry';
/* eslint-enable max-len */

export default Service.extend({
  ajax: service(),

  loadedScripts: {},
  timeout: 10000, // Time for libraries to load in miliseconds

  loadScript(scriptUrl, loadPredicate) {
    if (this.get('loadedScripts')[scriptUrl]) {
      return RSVP.Promise.resolve(true);
    }

    return this.get('ajax')
      .request(scriptUrl, {
        dataType: 'script',
        timeout: this.get('timeout'),
        cache: true,
      })
      .then(() => {
        if (!loadPredicate) {
          return RSVP.Promise.resolve(true);
        }

        return this._waitForLoadPredicate(loadPredicate);
      })
      .then(() => {
        this.get('loadedScripts')[scriptUrl] = true;
      });
  },

  loadGoogleMaps() {
    return this.loadScript(GOOGLE_MAP_URL, () => window.google && window.google.maps);
  },

  _waitForLoadPredicate(loadPredicate) {
    return new RSVP.Promise(function(resolve) {
      const checkIfLoaded = function() {
        if (loadPredicate()) {
          resolve();
        } else {
          run.later(this, checkIfLoaded, 500);
        }
      };

      checkIfLoaded();
    });
  },
});
