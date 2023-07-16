const {expect, test, describe} = require('@jest/globals');

describe('Тесты Jest', () => {
	describe('Примитивные значения', () => {
		describe('x === y', () => {
			test('1 + 2 = 3', () => {
				expect(1 + 2).toBe(3);
			});
		});
	});
});