const {assert} = require('chai');

describe('Тесты Chai стиль assert', () => {
	describe('Примитивные значения', () => {
		describe('x === y', () => {
			it('1 + 2 = 3', () => {
				assert.strictEqual(1 + 2, 3);
			});
		});
		describe('x == y', () => {
			it('1 + 2 = 3', () => {
				assert.equal(1 + 2, '3');
			});
		});
	});
});