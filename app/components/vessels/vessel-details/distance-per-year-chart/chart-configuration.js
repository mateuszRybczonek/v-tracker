import colorPalette from 'v-tracker/constants/color-palette';

const {
  COLOR_GREEN,
  COLOR_MYSTIC,
  COLOR_MYSTIC_15,
  COLOR_FO,
  COLOR_DO,
  COLOR_FW
} = colorPalette;

const COLORS = {
  GRID: COLOR_MYSTIC,
  GRID_SELECTED: COLOR_MYSTIC_15,
  LABEL: COLOR_GREEN,
  FO: COLOR_FO,
  DO: COLOR_DO,
  FW: COLOR_FW,
  CURVE_GRADIENT_START: COLOR_GREEN,
  CURVE_GRADIENT_END: COLOR_GREEN,
  BAR_GRADIENT_END: COLOR_MYSTIC_15,
};

const CHART_MARGINS = {
  top: 40,
  bottom: 80,
};

export {
  COLORS,
  CHART_MARGINS,
};
