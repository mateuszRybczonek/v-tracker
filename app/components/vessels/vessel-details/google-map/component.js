import Ember from 'ember';
import {
  getMapConfiguration,
  POINT_MARKER_CONFIG,
  POINT_MARKER_ICON_CONFIG,
  LINE_PATH_CONFIG,
  MIN_ZOOM_PARAMS,
} from './map-configuration';

const { Component, computed, inject: { service }, observer, run } = Ember;

export default Component.extend({
  screen: service(),
  lazyLoader: service(),

  librariesLoading: true,
  map: null,

  points: computed('reports', function() {
    const points = [];
    const reports = this.get('reports');

    if (reports.get('length') > 0) {
      reports.forEach( report => {
        const { lat, lng } = report.data;
        points.push({ lat, lng});
      });
      return points;
    }
  }),

  lines: computed('reports', function() {
    const lines = [];
    const reports = this.get('reports');

    if (reports.get('length') > 0) {
      reports.forEach( (report, index) => {
        const nextReport = reports.objectAt(index + 1);

        if (nextReport === undefined) {
          return;
        }

        const depLat = report.data.lat;
        const depLng = report.data.lng;
        const arrLat = nextReport.data.lng;
        const arrLng = nextReport.data.lng;

        lines.push({
          departure: { lat: depLat, lng: depLng },
          arrival: { lat: arrLat, lng: arrLng },
        });
      });
    }
    console.log(lines);
    return lines;
  }),

  onScreenChanged: observer('screen.width', function() {
    this._setMinZoom(this.get('screen.width'));

    this.setBounds();
  }),

  init() {
    this._super(...arguments);

    this._forceScreenResolutionObservers();
  },

  didInsertElement() {
    this._super(...arguments);

    this.get('lazyLoader').loadGoogleMaps()
      .then(() => {
        this.set('mapsAPI', window.google.maps);
        this.buildGmap();
      });
  },

  buildGmap() {
    const map = new (this.get('mapsAPI')).Map(this.$('.map').get(0), getMapConfiguration());
    this.set('map', map);

    run.later((() => {
      this.updateMap();
    }), 500);
  },

  updateMap() {
    this.addPoints(this.get('points'));

    this.addLines(this.get('lines'));

    this._setMinZoom(this.get('screen.width'));
    this.setBounds();
  },

  setBounds() {
    const latLngBounds = this.get('points.length') ?
      this._getPointsBounds() :
      this._getWholeWorldBounds();

    this.get('map').fitBounds(latLngBounds);
  },

  addPoints(pointsData) {
    if(pointsData === undefined) {
      return;
    }

    Object.keys(pointsData).forEach(key => {
      const marker = new (this.get('mapsAPI')).Marker(this._createPointMarkerParams(
        pointsData[key].lat,
        pointsData[key].lng,
      ));

      marker.setMap(this.get('map'));
    });
  },

  addLines(linesData) {
    if(linesData === undefined) {
      return;
    }

    Object.keys(linesData).forEach(key => {
      const { departure, arrival } = linesData[key];

      const line = new (this.get('mapsAPI')).Polyline(
        this._createLinePathParams(departure, arrival)
      );

      line.setMap(this.get('map'));
    });
  },

  _createPointMarkerParams(lat, lng) {
    return Object.assign(POINT_MARKER_CONFIG, {
      position: {
        lat, lng,
      },
      icon: POINT_MARKER_ICON_CONFIG,
    });
  },

  _createLinePathParams(departure, arrival) {
    return Object.assign(LINE_PATH_CONFIG, {
      path: [{
        lat: departure.lat,
        lng: departure.lng,
      }, {
        lat: arrival.lat,
        lng: arrival.lng,
      }],
    });
  },


  _getPointsBounds() {
    const latCoordintes = this.get('points').map(point => point.lat);

    const lngCoordinates = this.get('points').map(point => point.lng);

    return new (this.get('mapsAPI')).LatLngBounds(
      new (this.get('mapsAPI')).LatLng(Math.max(...latCoordintes), Math.min(...lngCoordinates)),
      new (this.get('mapsAPI')).LatLng(Math.min(...latCoordintes), Math.max(...lngCoordinates))
    );
  },

  _getWholeWorldBounds() {
    return new (this.get('mapsAPI')).LatLngBounds(
      new (this.get('mapsAPI')).LatLng(85, -180),
      new (this.get('mapsAPI')).LatLng(-80, 180)
    );
  },

  _forceScreenResolutionObservers() {
    return this.get('screen').getProperties('smallerThanPhone', 'smallerThanDesktop');
  },

  _setMinZoom(screenWidth) {
    const { MOBILE, TABLET, DESKTOP_1024, DESKTOP_2048 } = MIN_ZOOM_PARAMS;

    if (screenWidth <= MOBILE.BREAKPOINT) {
      this.set('map.minZoom', MOBILE.MIN_ZOOM);
    } else if (screenWidth <= TABLET.BREAKPOINT) {
      this.set('map.minZoom', TABLET.MIN_ZOOM);
    } else if (screenWidth <= DESKTOP_1024.BREAKPOINT) {
      this.set('map.minZoom', DESKTOP_1024.MIN_ZOOM);
    } else {
      this.set('map.minZoom', DESKTOP_2048.MIN_ZOOM);
    }
  },
});
