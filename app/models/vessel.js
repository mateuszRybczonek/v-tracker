import DS from 'ember-data';
import Ember from 'ember';
import { hasMany } from 'ember-data/relationships';

const { computed } = Ember;

export default DS.Model.extend({
  users: hasMany('user'),

  name: DS.attr('string'),
  imoNumber: DS.attr('string'),
  flag: DS.attr('string'),
  updatedAt: DS.attr('date', { defaultValue: new Date()}),

  isNameValid: computed.notEmpty('name'),
  isImoNumberValid: computed.notEmpty('imoNumber'),
  isFlagValid: computed.notEmpty('flag'),

  isValid: computed.and('isNameValid', 'isImoNumberValid', 'isFlagValid'),
});
