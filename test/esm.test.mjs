import {expect, assert} from 'chai';

describe('Тесты', () => {
	// Отменяет все утверждения, которые следуют в цепочке.
	it('.not', () => {
		expect(() => {}).to.not.throw();
		expect({a: 1}).to.not.have.property('b');
		expect(1).to.not.equal(2);
		assert.notEqual(1, 2);
	});
});