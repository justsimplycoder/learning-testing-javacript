const {expect} = require('chai');

describe('Тесты Chai стиль expect', () => {
	describe('Примитивные значения', () => {
		it('x === y', () => {
			expect(1 + 2).to.equal(3);
		});
		it('x == y', () => {
			expect(1 + 2).to.satisfy((num) => num == 3);
		});
	});
	describe('Проверка типов', () => {
		it('type string', () => {
			expect('text').to.be.a('string');
		});
	});
});