import DS from 'ember-data';
import Ember from 'ember';
import { hasMany } from 'ember-data/relationships';

const { computed } = Ember;

export default DS.Model.extend({
  users: hasMany('user'),
  positionReports: hasMany('position-report'),

  name: DS.attr('string'),
  imoNumber: DS.attr('number'),
  callsign: DS.attr('string'),
  MMSI: DS.attr('number'),
  flag: DS.attr('string'),
  GT: DS.attr('number'),
  yearBuild: DS.attr('number'),
  updatedAt: DS.attr('date', { defaultValue: new Date()}),

  isNameValid: computed.notEmpty('name'),
  isImoNumberValid: computed.notEmpty('imoNumber'),
  isFlagValid: computed.notEmpty('flag'),

  isValid: computed.and('isNameValid', 'isImoNumberValid', 'isFlagValid'),
});
