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
		it('x === finite', () => {
			expect(1).to.be.finite;
		});
		it('x !== null && x !== undefined', () => {
			expect(1).to.exist;
			expect(undefined).to.not.exist;
			expect(null).to.not.exist;
		});
		it('x !== undefined', () => {
			let x = null;
			expect(x).to.not.be.undefined;
		});
		it('x > y', () => {
			expect(11).to.be.above(10);
			expect(new Date(2000, 12, 17)).to.be.above(new Date(2000, 12, 16));
		});
		it('x >= y', () => {
			expect(11).to.be.at.least(10);
			expect(10).to.be.at.least(10);
		});
		it('x < y', () => {
			expect(10).to.be.at.below(11);
		});
		it('x <= y', () => {
			expect(10).to.be.at.most(11);
			expect(11).to.be.at.most(11);
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
	describe('Разное', () => {
		it('length', () => {
			expect([1, 2, 3]).to.have.lengthOf(3);
			expect('text').to.have.lengthOf(4);
			expect(new Set([1, 2, 3])).to.have.lengthOf(3);
			expect(new Map([['a', 1], ['b', 2], ['c', 3]])).to.have.lengthOf(3);
		});
		it('match', () => {
			expect('foobar').to.match(/^foo/);
		});
		it('string include', () => {
			expect('foobar').to.have.string('bar');
			expect('foobar').to.include.string('bar');
		});
		it('array include', () => {
			expect([1, 2, 3]).to.include(2);
			expect(1).to.be.oneOf([1, 2, 3]);
		});
	});
	describe('Объекты', () => {
		it('new Obj instanceof Obj', () => {
			function Cat () { }
			expect(new Cat()).to.be.a.instanceof(Cat);
			expect({a: 1}).to.be.an.instanceof(Object);
			expect([1, 2, 3]).to.be.an.instanceof(Array);
			expect(() => {}).to.be.a.instanceof(Function);
		});
		it('property Object', () => {
			const obj = {
				a: 1,
				b: [1, 2, 3],
				c: {
					x: 1,
					y: 2
				},
				d: [{a: 11}, {b: 22}, {c: 33}]
			};

			expect(obj).to.have.property('a');
			expect(obj).to.have.property('a', 1);
			expect(obj).to.have.deep.property('c', {x:1, y:2});
			expect(obj).to.have.nested.property('d[1].b');
			expect(obj).to.have.nested.property('d[1].b', 22);
			expect(obj).to.have.deep.nested.property('d[1]', {b: 22});
		});
		it('frozen Object', () => {
			let obj = {
				a: 1
			};
			Object.freeze(obj);
			expect(obj).to.be.frozen;
		});
	});
	describe('Error', () => {
		it('throw Error', () => {
			expect(() => {
				throw new Error('Ошибка');
			}).to.throw();
			expect(() => {
				throw new TypeError('Ошибка');
			}).to.throw();
		});
	});
});