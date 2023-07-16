const {expect} = require('chai');

describe('Тесты Chai стиль expect', () => {
	describe('Примитивные значения', () => {
		describe('x === y', () => {
			it('1 + 2 = 3', () => {
				expect(1 + 2).to.equal(3);
			});
		});
	});
});