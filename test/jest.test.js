const {expect, test, describe} = require('@jest/globals');

describe('Тесты Jest', () => {
	test('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
	test('string', () => {
		expect.stringContaining('foo');
	});
});