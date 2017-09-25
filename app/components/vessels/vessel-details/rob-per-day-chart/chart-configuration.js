import colorPalette from 'v-tracker/constants/color-palette';

const {
  COLOR_FONT_GRAY,
  COLOR_GREEN,
  COLOR_GRID,
  COLOR_MYSTIC_15,
  COLOR_FO,
  COLOR_DO,
  COLOR_FW
} = colorPalette;

const COLORS = {
  GRID: COLOR_GRID,
  GRID_SELECTED: COLOR_MYSTIC_15,
  GRIC_FONT: COLOR_FONT_GRAY,
  LABEL: COLOR_GREEN,
  FOROB: COLOR_FO,
  DOROB: COLOR_DO,
  FWROB: COLOR_FW,
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