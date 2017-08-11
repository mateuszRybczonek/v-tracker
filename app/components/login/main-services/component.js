import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: ['section'],

  items: [
    {
      icon: 'backup',
      title: 'Access',
      descriptionItems: [
        'World-wide cover'
      ],
    }, {
      icon: 'assignment',
      title: 'Reports',
      descriptionItems: [
        'Remotely reports'
      ],
    }, {
      icon: 'assessment',
      title: 'Statistics',
      descriptionItems: [
        'Track performance'
      ],
    },
  ],
});
