import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('users', function() {
    this.route('vessels', function() {
      this.route('new');
      this.route('edit', { path: '/:vessel_id/edit' });
      this.route('details', { path: '/:vessel_id'});

      this.route('reports', function() {
        this.route('new', { path: '/:vessel_id/position-report/new' });
        this.route('edit', { path: '/:position_report_id/edit' });
      });
    });
    this.route('reports');
  });
});

export default Router;
