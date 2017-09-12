import EmberScreen, { breakpoint } from 'ember-screen';

export default EmberScreen.extend({
  smallerThanPhone: breakpoint('(max-width: 480px)'),
  smallerThanTablet: breakpoint('(max-width: 767px)'),
  smallerThanDesktop: breakpoint('(max-width: 1023px)'),

  largerThanPhone: breakpoint('(min-width: 481px)'),
  largerThanTablet: breakpoint('(min-width: 768px)'),
  largerThanDesktop: breakpoint('(min-width: 1024px)'),

  bootstrapXs: breakpoint('(min-width: 0px)'),
  bootstrapSm: breakpoint('(min-width: 768px)'),
  bootstrapMd: breakpoint('(min-width: 992px)'),
  bootstrapLg: breakpoint('(min-width: 1200px)'),
});
