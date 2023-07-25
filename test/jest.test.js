const {expect, test, describe} = require('@jest/globals');

describe('Тесты Jest', () => {
	describe('Примитивные значения', () => {
		test('x === y', () => {
			expect(1 + 2).toBe(3);
			expect(1 + 2).toEqual(3);
			expect(1 + 2).toStrictEqual(3);
		});
		test('x == y', () => {
			expect(1 + 2 == '3').toBe(true);
		});
		test('x === true', () => {
			expect(true).toBe(true);
		});
		test('x === false', () => {
			expect(false).toBe(false);
		});
	});
	describe('Проверка типов', () => {
		test('type string', () => {
			expect(typeof 'text').toBe('string');
			expect('text').toEqual(expect.any(String));
		});
		test('type number', () => {
			expect(typeof 3.14).toBe('number');
			expect(Infinity).toEqual(expect.any(Number));
			expect(NaN).toEqual(expect.any(Number));
		});
		test('type boolean', () => {
			expect(typeof true).toBe('boolean');
			expect(true).toEqual(expect.any(Boolean));
		});
		test('type null', () => {
			expect(null).toBeNull();
		});
		test('type array', () => {
			expect(Array.isArray([1, 2, 3])).toBe(true);
			expect([1, 2, 3]).toEqual(expect.any(Array));
			expect([1, 2, 3]).toBeInstanceOf(Array);
		});
		test('type object', () => {
			expect(typeof {a: 1}).toBe('object');
			expect({a: 1}).toEqual(expect.any(Object));
		});
		test('type undefined', () => {
			expect(typeof undefined).toBe('undefined');
			expect(undefined).toBeUndefined();
		});
		test('type function', () => {
			const f = () => {}
			expect(typeof f).toBe('function');
			expect(f).toEqual(expect.any(Function));
		});
	});
});