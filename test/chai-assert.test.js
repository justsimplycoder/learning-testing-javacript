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
			assert.isString('text');
		});
		it('type number', () => {
			assert.typeOf(3.14, 'number');
			assert.isNumber(NaN);
			assert.isNumber(Infinity);
		});
		it('type boolean', () => {
			assert.typeOf(true, 'boolean');
			assert.isBoolean(true);
		});
		it('type null', () => {
			assert.typeOf(null, 'null');
			assert.isNull(null);
		})
	});
});