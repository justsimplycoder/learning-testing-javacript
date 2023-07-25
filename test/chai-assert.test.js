const {assert} = require('chai');

describe('Тесты Chai стиль assert', () => {
	describe('Примитивные значения', () => {
		it('x === y', () => {
			assert.strictEqual(1 + 2, 3);
		});
		it('x == y', () => {
			assert.equal(1 + 2, '3');
		});
		it('x === true', () => {
			assert.isTrue(true);
		});
		it('x === false', () => {
			assert.isFalse(false);
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
		});
		it('type array', () => {
			assert.typeOf([1, 2, 3], 'array');
			assert.isArray([1, 2, 3]);
		});
		it('type object', () => {
			assert.typeOf({a: 1}, 'object');
			assert.isObject({a: 1});
		});
		it('type undefined', () => {
			assert.typeOf(undefined, 'undefined');
			assert.isUndefined(undefined);
		});
		it('type function', () => {
			const f = () => {};
			assert.typeOf(f, 'function');
			assert.isFunction(f);
		});
	});
});