import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  user: hasMany('user'),

  name: DS.attr('string'),
  imoNumber: DS.attr('string'),
  flag: DS.attr('string'),
});
