import Ember from 'ember';

const { Component, inject: { service }, $ } = Ember;

export default Component.extend({
  classNames: ['main-navigation'],
  router: service('-routing'),

  didInsertElement() {
    const $content = $('main');
    const $mainNavigation = $('.main-navigation');

    $('.menu-toggle').on('click', function(){
      $content.toggleClass('menu-opened');
      $mainNavigation.toggleClass('menu-opened');
    });
    $('.content').on('click', function(){
      $content.removeClass('menu-opened');
      $mainNavigation.removeClass('menu-opened');
    });
  },

  actions: {
    signOut() {
      this.get('session').close().then(() => {
        this.get('router').transitionTo('login');
      });
    },
  },
});
