import DS from 'ember-data';
import Ember from 'ember';
import { belongsTo } from 'ember-data/relationships';

const { computed } = Ember;

export default DS.Model.extend({
  vessel: belongsTo('vessel'),

  updatedAt: DS.attr('date', { defaultValue: new Date()}),
  reportTime: DS.attr('date'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  course: DS.attr('number'),
  etaToNextWpt: DS.attr('date'),
  windDir: DS.attr('number'),
  windSpd: DS.attr('number'),
  seaState: DS.attr('number'),
  swellDir: DS.attr('number'),
  swellHeight: DS.attr('number'),
  pitch: DS.attr('number'),
  roll: DS.attr('number'),
  etaToDestination: DS.attr('date'),
  foRob: DS.attr('number'),
  doRob: DS.attr('number'),
  fwRob: DS.attr('number'),
  pob: DS.attr('number'),


  isUpdatedAtValid: computed.notEmpty('updatedAt'),
  isReportTimeValid: computed.notEmpty('reportTime'),
  isLatValid: computed.notEmpty('lat'),
  isLngValid: computed.notEmpty('lng'),
  isCourseValid: computed.notEmpty('course'),
  isWindDirValid: computed.notEmpty('windDir'),
  isWindSpdValid: computed.notEmpty('windSpd'),
  isFoRobValid: computed.notEmpty('foRob'),
  isDoRobValid: computed.notEmpty('doRob'),
  isFwRobValid: computed.notEmpty('fwRob'),
  isPobValid: computed.notEmpty('pob'),

  isValid: computed.and(
    'isUpdatedAtValid',
    'isReportTimeValid',
    'isLatValid',
    'isLngValid',
    'isCourseValid',
    'isWindDirValid',
    'isWindSpdValid',
    'isFoRobValid',
    'isDoRobValid',
    'isFwRobValid',
    'isPobValid'
  ),
});
