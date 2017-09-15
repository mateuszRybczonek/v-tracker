import Ember from 'ember';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line, curveCatmullRom } from 'd3-shape';
import { COLORS, CHART_MARGINS } from './chart-configuration';

const { Evented, computed } = Ember;

export default Ember.Object.extend(Evented, {
  svg: null,
  data: null,

  values: computed.mapBy('data', 'doRob'),

  svgWidth: computed('svg', function() {
    return this.get('svg').node().getBoundingClientRect().width;
  }),

  svgHeight: computed('svg', function() {
    return this.get('svg').node().getBoundingClientRect().height;
  }),

  curveWidth: computed.reads('svgWidth'),

  curveHeight: computed('svgHeight', function() {
    return this.get('svgHeight') - (CHART_MARGINS.top + CHART_MARGINS.bottom);
  }),

  xScale: computed('data', 'curveWidth', function() {
    const data = this.get('data');
    return scaleTime()
      .domain([new Date(data.objectAt(0).get('reportTime')), new Date(data.objectAt([data.length - 1]).get('reportTime'))])
      .range([0, this.get('curveWidth')]);
  }),

  yScale: computed('values', 'curveHeight', function() {
    const values = this.get('values');
    return scaleLinear()
      .domain([Math.min(...values), Math.max(...values)])
      .range([this.get('curveHeight'), 0]);
  }),

  lineGenerator: computed('xScale', 'data', function() {
    const xScale = this.get('xScale');

    return line().curve(curveCatmullRom.alpha(0.5))
      .x((data, index) => {
        switch (index) {
          case 0:
            return xScale(new Date(data.get('reportTime'))) + 5;
          case (this.get('data').length - 1):
            return xScale(new Date(data.get('reportTime'))) - 5;
          default:
            return xScale(new Date(data.get('reportTime')));
        }
      })
      .y(data => this.get('yScale')(data.get('doRob')));
  }),

  init() {
    this._super(...arguments);

    this.draw();
  },

  dispose() {
    this.set('layer', null);
  },

  draw() {
    const layer = this.get('svg').append('g').classed('chart-layer', true);

    this._setDimensions(layer);
    this._setGradient();
    layer
      .append('path')
      .classed('path', true)
      .attr('d', this.get('lineGenerator')(this.get('data')))
      .attr('stroke', 'url(#curveGradient)')
      .attr('stroke-width', 5)
      .attr('fill', 'none')
      .attr('stroke-linecap', 'round');

    this.set('layer', layer);
  },

  _setDimensions(layer) {
    layer
      .attr('width', this.get('curveWidth'))
      .attr('height', this.get('curveHeight'))
      .attr('transform', `translate(${[0, CHART_MARGINS.top]})`);
  },

  _setGradient() {
    const gradient = this.get('svg').append('defs')
      .append('linearGradient')
      .attr('id', 'curveGradient')
      .attr('x1', '0%')
      .attr('y1', '50%')
      .attr('x2', '100%')
      .attr('y2', '50%')
      .attr('spreadMethod', 'pad');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', COLORS.GRID)
      .attr('stop-opacity', 1);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', COLORS.DO)
      .attr('stop-opacity', 1);
  },
});
