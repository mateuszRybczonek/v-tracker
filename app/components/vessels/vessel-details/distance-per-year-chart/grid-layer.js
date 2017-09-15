import Ember from 'ember';
import { select } from 'd3-selection';
import { COLORS } from './chart-configuration';

const { Evented, computed } = Ember;

const EVENTS = {
  BAR_CLICK: 'bar-click',
};

export default Ember.Object.extend(Evented, {
  svg: null,
  data: null,
  selected: null,

  numberOfYears: computed.reads('data.length'),

  svgWidth: computed('svg', function() {
    return this.get('svg').node().getBoundingClientRect().width;
  }),

  barWidth: computed('svgWidth', 'numberOfYears', function() {
    return this.get('svgWidth') / this.get('numberOfYears');
  }),

  init() {
    this._super(...arguments);

    this.draw();
  },

  dispose() {
    if (this.get('axisLayer')) {
      this.get('axisLayer').selectAll('rect')
        .on('click', null)
        .on('mouseover', null)
        .on('mouseout', null);
    }

    this.set('axisLayer', null);
    this.set('labelsLayer', null);
  },

  draw() {
    this._drawAxis();
    this._drawLabels();
  },

  _drawAxis() {
    const scope = this;
    const layer = this.get('svg').append('g').classed('axis-layer', true);

    const barWidth = this.get('barWidth');

    this._setBarGradient();

    layer
      .attr('width', this.get('svgWidth'))
      .attr('height', this.get('svgHeight'));

    layer.selectAll('rect')
      .data(this.get('data'))
      .enter()
      .append('rect')
      .classed('year', true)
      .attr('width', barWidth)
      .attr('height', '101%') // trick to hide top/bottom lines of rectangles
      .attr('fill', 'transparent')
      .attr('stroke', COLORS.GRID)
      .attr('stroke-width', 2)
      .attr('y', '-1') // trick to hide top line of rectangles
      .attr('x', (distance, index) => barWidth * index)
      .on('click', function() { scope._onBarClick(this, ...arguments); })
      .on('mouseover', function() { scope._onBarMouseOver(this, ...arguments); })
      .on('mouseout', function() { scope._onBarMouseOut(this, ...arguments); });

    this.set('axisLayer', layer);
  },

  _drawLabels() {
    const layer = this.get('svg').append('g').classed('labels-layer', true);
    const barWidth = this.get('barWidth');

    layer
      .attr('width', this.get('svgWidth'))
      .attr('height', this.get('svgHeight'));

    layer
      .selectAll('text')
      .data(this.get('data'))
      .enter()
      .append('text')
      .text(data => data.get('reportTime'))
      .attr('font-family', 'Roboto')
      .attr('font-size', '10px')
      .attr('font-weight', '400')
      .attr('fill', COLORS.FO)
      .attr('x', (data, index) => (barWidth / 2) + barWidth * index)
      .attr('y', '320')
      .attr('text-anchor', 'middle');

    this.set('labelsLayer', layer);
  },

  _onBarClick(element, distance, index) {
    this.get('axisLayer').selectAll('rect')
      .attr('fill', 'transparent');

    select(element)
      .attr('fill', COLORS.GRID_SELECTED);

    this.set('selected', index);
    this.trigger(EVENTS.BAR_CLICK, index);
  },

  _onBarMouseOver(element, distance, index) {
    const currentlySelected = this.get('selected');

    if (index !== currentlySelected) {
      this.get('axisLayer').selectAll('rect')
        .filter((distance, index) => index !== currentlySelected)
        .attr('fill', 'transparent');

      select(element).attr('fill', 'url(#barGradient)');
    }
  },

  _onBarMouseOut(element, distance, index) {
    if (index !== this.get('selected')) {
      select(element).attr('fill', 'transparent');
    }
  },

  _setBarGradient() {
    const gradient = this.get('svg').append('defs')
      .append('linearGradient')
      .attr('id', 'barGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')
      .attr('spreadMethod', 'pad');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FFF')
      .attr('stop-opacity', 1);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', COLORS.BAR_GRADIENT_END)
      .attr('stop-opacity', 1);
  },
});

export { EVENTS };
