const {expect, test, describe} = require('@jest/globals');

describe('Тесты Jest', () => {
	describe('Примитивные значения', () => {
		test('x === y', () => {
			expect(1 + 2).toBe(3);
			expect(1 + 2).toEqual(3);
			expect(1 + 2).toStrictEqual(3);
		});
		test('x == y', () => {
			// Нет реализации
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
	});
});