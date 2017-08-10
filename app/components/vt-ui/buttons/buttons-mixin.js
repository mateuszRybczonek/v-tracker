import Ember from 'ember';

const { Mixin, assert, isPresent } = Ember;

export default Mixin.create({
  tagName: 'button',
  attributeBindings: ['disabled'],

  init() {
    this._super(...arguments);

    assert(
      'Component `vt-ui/buttons/icon` must have action passed to `onClick` property',
      isPresent(this.get('onClick'))
    );
  },

  click() {
    this._super(...arguments);

    this.get('onClick')();
  },
});
