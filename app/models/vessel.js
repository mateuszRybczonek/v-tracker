import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  user: hasMany('user'),

  name: DS.attr('string'),
  imoNumber: DS.attr('string'),
  flag: DS.attr('string'),
  updatedAt: DS.attr('date', { defaultValue: new Date()}),
});
