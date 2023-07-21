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
	});
});