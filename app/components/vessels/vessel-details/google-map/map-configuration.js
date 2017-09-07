import colorPalette from '../../../../constants/color-palette';

const { COLOR_CARIBBEAN_GREEN, COLOR_WATER, COLOR_LANDSCAPE } = colorPalette;

const COLORS = {
  POINT: COLOR_CARIBBEAN_GREEN,
  LINE: '#FFFFFF',
  WATER: COLOR_WATER,
  LANDSCAPE: COLOR_LANDSCAPE,
};

const LINE_SYMBOL_CONFIG = {
  path: 'M 0,-2 0,2',
  strokeOpacity: 1,
  strokeWeight: 2,
  scale: 1,
};

const MIN_ZOOM_PARAMS = {
  MOBILE: {
    BREAKPOINT: 468,
    MIN_ZOOM: 1,
  },
  TABLET: {
    BREAKPOINT: 1024,
    MIN_ZOOM: 2,
  },
  DESKTOP_1024: {
    BREAKPOINT: 2048,
    MIN_ZOOM: 3,
  },
  DESKTOP_2048: {
    MIN_ZOOM: 4,
  },
};

const POINT_MARKER_CONFIG = {
  clickable: false,
};

const POINT_MARKER_ICON_CONFIG = {
  path: 'M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
  strokeOpacity: 1,
  strokeWeight: 4,
  strokeColor: COLORS.POINT,
  fillColor: '#FFFFFF',
  fillOpacity: 1,
  scale: 1,
};

const LINE_PATH_CONFIG = {
  clickable: false,
  geodesic: false,
  strokeOpacity: 0,
  strokeColor: COLORS.LINE,
  icons: [{
    icon: LINE_SYMBOL_CONFIG,
    repeat: '10px',
  }],
};

function getMapConfiguration() {
  return {
    minZoom: 1,
    maxZoom: 6,
    scrollwheel: false,
    zoomControlOptions: {
      style: 'SMALL',
    },
    streetViewControl: false,
    backgroundColor: COLORS.LANDSCAPE,
    mapTypeControl: false,
    gestureHandling: 'cooperative',
    styles: [
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ color: COLORS.LANDSCAPE }],
      },
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road.highway',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road.arterial',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road.local',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative.province',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative.locality',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative.province',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative.neighborhood',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [
          { visibility: 'on' },
          { color: COLORS.WATER },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          { color: COLORS.WATER },
        ],
      },
    ],
  };
}

export {
  getMapConfiguration,
  COLORS,
  POINT_MARKER_CONFIG,
  POINT_MARKER_ICON_CONFIG,
  LINE_PATH_CONFIG,
  MIN_ZOOM_PARAMS,
};
