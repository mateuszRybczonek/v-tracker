import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  vessels: hasMany('vessel'), 

  email: DS.attr('string'),
});
