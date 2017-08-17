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
      icon: 'content-paste',
      title: 'Reports',
      descriptionItems: [
        'Remotely reports'
      ],
    }, {
      icon: 'bar-chart',
      title: 'Statistics',
      descriptionItems: [
        'Track performance'
      ],
    },
  ],
});
