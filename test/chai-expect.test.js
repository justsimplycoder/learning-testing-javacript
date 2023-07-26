const {expect} = require('chai');

describe('Тесты Chai стиль expect', () => {
	describe('Примитивные значения', () => {
		it('x === y', () => {
			expect(1 + 2).to.equal(3);
		});
		it('x == y', () => {
			expect(1 + 2).to.satisfy((num) => num == 3);
			expect(1 + 2 == '3').to.be.true;
		});
		it('x === true', () => {
			expect(true).to.be.true;
		});
		it('x === false', () => {
			expect(false).to.be.false;
		});
		// false, 0, '', null, undefined и NaN - ложные значения
		it('x == true', () => {
			expect(true).to.be.ok;
			expect(1).to.be.ok;
			expect('text').to.be.ok;
			expect([]).to.be.ok;
		});
		it('x == false', () => {
			expect(false).to.be.not.ok;
			expect(0).to.be.not.ok;
			expect('').to.be.not.ok;
			expect(null).to.be.not.ok;
			expect(undefined).to.be.not.ok;
			expect(NaN).to.be.not.ok;
		});
		it('x === NaN', () => {
			expect(NaN).to.be.NaN;
		});
	});
	describe('Проверка типов', () => {
		it('type string', () => {
			expect('text').to.be.a('string');
		});
		it('type number', () => {
			expect(3.14).to.be.a('number');
			expect(Infinity).to.be.a('number');
			expect(NaN).to.be.a('number');
		});
		it('type boolean', () => {
			expect(true).to.be.a('boolean');
		});
		it('type null', () => {
			expect(null).to.be.a('null');
			expect(null).to.be.null;
		});
		it('type array', () => {
			expect([1, 2, 3]).to.be.an('array');
		});
		it('type object', () => {
			expect({a: 1}).to.be.an('object');
		});
		it('type undefined', () => {
			expect(undefined).to.be.an('undefined');
			expect(undefined).to.be.undefined;
		});
		it('type function', () => {
			const f = () => {};
			expect(f).to.be.a('function');
		});
	});
});