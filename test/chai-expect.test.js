const chai = require('chai');
const chaiAlmost = require('chai-almost');

chai.use(chaiAlmost());
const expect = chai.expect;

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
		it('x <= z <= y', () => {
			expect(2).to.be.within(1, 3);
			expect(2).to.be.within(2, 3);
			expect(2).to.be.within(1, 2);
			expect('foo').to.have.lengthOf.within(2, 4);
			expect([1, 2, 3]).to.have.lengthOf.within(2, 4);
		});
		it('float x === float y', () => {
			const value = 0.1 + 0.2;
			expect(value).to.be.closeTo(0.3, 0.0000000001);
			expect(value).to.almost.equal(0.3); // расширение chai-almost
		});
		it('empty', () => {
			expect({}).to.be.empty;
			expect([]).to.be.empty;
			expect('').to.be.empty;
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
		it('type regexp', () => {
			expect(/tes/).to.be.a('regexp');
		});
		it('type promise', () => {
			expect(Promise.resolve()).to.be.a('promise');
		});
		it('type myCustomType', () => {
			const myObj = {
				[Symbol.toStringTag]: 'myCustomType'
			};
			expect(myObj).to.be.a('myCustomType');
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
		it('sealed  Object', () => {
			let sealedObject = Object.seal({});
			let frozenObject = Object.freeze({});
			expect(sealedObject).to.be.sealed;
			expect(frozenObject).to.be.sealed;
		});
		it('extensible Object', () => {
			let obj = {
				a: 1
			};
			expect(obj).to.be.extensible;
			Object.preventExtensions(obj);
			expect(obj).to.not.be.extensible;
		});
		it('equal', () => {
			expect({a: 1}).to.eql({a: 1});
			expect({a: 1}).to.deep.equal({a: 1});
			expect({a: 1, b: {x: 1, y: 2}}).to.eql({a: 1, b: {x: 1, y: 2}});
			expect({a: 1, b: {x: 1, y: 2}}).to.deep.equal({a: 1, b: {x: 1, y: 2}});
			expect({a: 1}).to.not.eql({a: 2});
			expect({a: 1}).to.deep.not.equal({a: 2});
			expect({a: 1}).to.not.eql({a: 1, b: 2});
			expect({a: 1}).to.deep.not.equal({a: 1, b: 2});
		});
		it('object include', () => {
			expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
			expect({a: 1, b: {x: 2, y: 3}}).to.deep.include({b: {x: 2, y: 3}});
		});
		it('getOwnPropertyDescriptors', () => {
			expect({a: 1}).to.have.ownPropertyDescriptor('a', {
				configurable: true,
				enumerable: true,
				writable: true,
				value: 1,
			});
		});
		it('keys', () => {
			expect({a: 1, b: 2}).to.have.any.keys('a');
			expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
			expect({a: 1, b: 2}).to.have.all.keys(['a', 'b']);
			expect({a: 1, b: 2}).to.have.all.keys({a: 4, b: 5}); // ignore 4 and 5
		});
		it('own', () => {
			function O() {
				this.a = 1;
			}
			O.prototype.b = 2;
			expect(new O()).to.include({a: 1})
			expect(new O()).to.include({b: 2})
			expect(new O()).to.own.include({a: 1})
			expect(new O()).to.not.own.include({b: 2})
		});
	});
	describe('Массивы', () => {
		it('array include', () => {
			expect([1, 2, 3]).to.include(2);
			expect(1).to.be.oneOf([1, 2, 3]);
			expect([1, [2, 3]]).to.deep.include([2, 3]);
		});
		it('keys', () => {
			expect(['x', 'y']).to.have.any.keys(1);
			expect(['x', 'y']).to.have.all.keys(0, 1);
			expect(['x', 'y']).to.have.all.keys([0, 1]);
			expect(['x', 'y']).to.have.all.keys({0: 4, 1: 5}); // ignore 4 and 5
		});
		it('equal array', () => {
			expect([1, 2]).to.deep.equal([1, 2]);
			expect([1, 2]).to.eql([1, 2]);
			expect([{x: 1, y: 3}, {x: 2, y: 4}]).to.deep.equal([{x: 1, y: 3}, {x: 2, y: 4}]);
			expect([{x: 1, y: 3}, {x: 2, y: 4}]).to.eql([{x: 1, y: 3}, {x: 2, y: 4}]);
		});
		it('order element', () => {
			expect([1, 2]).to.have.ordered.members([1, 2]);
			expect([{a: 1}, {b: 2}, {c: 3}]).to.have.deep.ordered.members([{a: 1}, {b: 2}, {c: 3}]);
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
		it('close to', () => {
			expect(1.5).to.be.closeTo(1, 0.5);
			expect(1.5).to.be.closeTo(2, 0.5);
			expect(1.5).to.be.closeTo(1, 1);
			expect(1.5).to.be.closeTo(1, 3);
			expect(1.5).to.not.be.closeTo(1, 0.4);
		});
		it('arguments function', () => {
			(function () {
				expect(arguments).to.be.arguments;
			})();
		});
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