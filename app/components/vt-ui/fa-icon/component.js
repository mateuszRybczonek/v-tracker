import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['fa', 'icon'],
  classNameBindings: ['iconName'],
  tagName: 'i',

  iconName: computed('icon', function () {
    return `fa-${this.get('icon')}`;
  }),
});
