import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login/main-header', 'Integration | Component | login/main header', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{login/main-header}}`);

  assert.equal(this.$('.small-text-top').length(), 1, 'small text top');
  assert.equal(this.$('.main-text').length(), 1, 'main text top');
  assert.equal(this.$('.small-text-bottom').length(), 1, 'small text bottom');
  assert.equal(this.$('.login-button').length(), 1, 'login button');
});
