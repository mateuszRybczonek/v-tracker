import Ember from 'ember';
import { handle, EventHandlersMixin } from 'ember-cli-event-handlers';
import { select } from 'd3-selection';
import GridLayer, { EVENTS as GRID_LAYER_EVENTS } from './grid-layer';
import CurveLayer from './curve-layer';

const { Component, computed, run } = Ember;

export default Component.extend(EventHandlersMixin, {
  svgWidth: computed('svg', function() {
    return this.get('svg').node().getBoundingClientRect().width;
  }),

  svgHeight: computed('svg', function() {
    return this.get('svg').node().getBoundingClientRect().height;
  }),

  resizeHandle: handle('resize', 'window', function() {
    this.drawChart();
  }),

  init() {
    this._super(...arguments);

    this.set('_onBarClickBound', this._onBarClick.bind(this));
  },

  didInsertElement() {
    run.later((() => {
      this.drawChart();
    }), 500);
  },

  drawChart() {
    this._reset();
    this._setSvg();
    this._drawGrid();
    this._drawCurve();
  },

  _reset() {
    this.$('svg').empty();

    if (this.get('gridLayer')) {
      this.get('gridLayer').off(GRID_LAYER_EVENTS.BAR_CLICK, this.get('_onBarClickBound'));
      this.get('gridLayer').dispose();
    }

    if (this.get('curveLayer')) {
      this.get('curveLayer').dispose();
    }
  },

  _setSvg() {
    this.set('svg', select(this.$('svg')[0]));

    const svgWidth = this.get('svgWidth');
    const svgHeight = this.get('svgHeight');

    this.get('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
      .attr('preserveAspectRatio', 'none');
  },

  _drawGrid() {
    const gridLayer = GridLayer.create({
      data: this.get('data'),
      svg: this.get('svg'),
      selected: this.get('selectedYearIndex'),
    });

    gridLayer.on(GRID_LAYER_EVENTS.BAR_CLICK, this.get('_onBarClickBound'));
    this.set('gridLayer', gridLayer);
  },

  _drawCurve() {
    const curveLayer = CurveLayer.create({
      data: this.get('data'),
      svg: this.get('svg'),
    });

    this.set('curveLayer', curveLayer);
  },

  _onBarClick(index) {
    this.set('selectedYearIndex', index);
    this.get('onYearChange')(this.get('data')[index].year);
  },
});
