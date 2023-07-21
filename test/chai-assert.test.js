const {assert} = require('chai');

describe('Тесты Chai стиль assert', () => {
	describe('Примитивные значения', () => {
		it('x === y', () => {
			assert.strictEqual(1 + 2, 3);
		});
		it('x == y', () => {
			assert.equal(1 + 2, '3');
		});
	});
	describe('Проверка типов', () => {
		it('type string', () => {
			assert.typeOf('text', 'string');
		});
	});
});