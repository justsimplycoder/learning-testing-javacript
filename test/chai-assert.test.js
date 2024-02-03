const {assert} = require('chai');

describe('Тесты Chai стиль assert', () => {
	describe('Примитивные значения', () => {
		it('x === y', () => {
			assert.strictEqual(1 + 2, 3);
		});
		it('x == y', () => {
			assert.equal(1 + 2, '3');
		});
		it('x === true', () => {
			assert.isTrue(true);
		});
		it('x === false', () => {
			assert.isFalse(false);
		});
		// false, 0, '', null, undefined и NaN - ложные значения
		it('x == true', () => {
			assert.isOk(true);
			assert.isOk(1);
			assert.isOk('text');
			assert.isOk([]);
		});
		it('x == false', () => {
			assert.isNotOk(false);
			assert.isNotOk(0);
			assert.isNotOk('');
			assert.isNotOk(null);
			assert.isNotOk(undefined);
			assert.isNotOk(NaN);
		});
		it('x === NaN', () => {
			assert.isNaN(NaN);
		});
		it('x === finite', () => {
			assert.isFinite(1);
		});
		it('x !== null && x !== undefined', () => {
			assert.exists(1);
			assert.notExists(undefined);
			assert.notExists(null);
		});
		it('x !== undefined', () => {
			let x = null;
			assert.isDefined(x);
		});
		it('x > y', () => {
			assert.isAbove(11, 10);
			assert.isAbove(new Date(2000, 12, 17), new Date(2000, 12, 16));
		});
		it('x >= y', () => {
			assert.isAtLeast(11, 10);
			assert.isAtLeast(11, 11);
		});
		it('x < y', () => {
			assert.isBelow(10, 11);
		});
		it('x <= y', () => {
			assert.isAtMost(10, 11);
			assert.isAtMost(11, 11);
		});
		it('float x === float y', () => {
			const value = 0.1 + 0.2;
			assert.closeTo(value, 0.3, 0.0000000001);
		});
		it('empty', () => {
			assert.isEmpty({});
			assert.isEmpty([]);
			assert.isEmpty('');
		});
	});
	describe('Проверка типов', () => {
		it('type string', () => {
			assert.typeOf('text', 'string');
			assert.isString('text');
		});
		it('type number', () => {
			assert.typeOf(3.14, 'number');
			assert.isNumber(NaN);
			assert.isNumber(Infinity);
		});
		it('type boolean', () => {
			assert.typeOf(true, 'boolean');
			assert.isBoolean(true);
		});
		it('type null', () => {
			assert.typeOf(null, 'null');
			assert.isNull(null);
		});
		it('type array', () => {
			assert.typeOf([1, 2, 3], 'array');
			assert.isArray([1, 2, 3]);
		});
		it('type object', () => {
			assert.typeOf({a: 1}, 'object');
			assert.isObject({a: 1});
		});
		it('type undefined', () => {
			assert.typeOf(undefined, 'undefined');
			assert.isUndefined(undefined);
		});
		it('type function', () => {
			const f = () => {};
			assert.typeOf(f, 'function');
			assert.isFunction(f);
		});
		it('type regexp', () => {
			assert.typeOf(/tea/, 'regexp');
		});
		it('type promise', () => {
			assert.typeOf(Promise.resolve(), 'promise');
		});
		it('type myCustomType', () => {
			const myObj = {
				[Symbol.toStringTag]: 'myCustomType'
			};
			assert.typeOf(myObj, 'myCustomType');
		});
	});
	describe('Разное', () => {
		it('length', () => {
			assert.lengthOf([1, 2, 3], 3);
			assert.lengthOf('text', 4);
			assert.lengthOf(new Set([1, 2, 3]), 3);
			assert.lengthOf(new Map([['a', 1], ['b', 2], ['c', 3]]), 3);
		});
		it('match', () => {
			assert.match('foobar', /^foo/);
		});
		it('string include', () => {
			assert.include('foobar', 'bar');
		});
		it('array include', () => {
			assert.include([1, 2, 3], 2);
			assert.oneOf(1, [1, 2, 3]);
			assert.deepInclude([1, [2, 3]], [2, 3]);
		});
		it('close to', () => {
			assert.closeTo(1.5, 1, 0.5);
			assert.closeTo(1.5, 2, 0.5);
			assert.closeTo(1.5, 1, 1);
			assert.closeTo(1.5, 1, 3);
		});
		it('arguments function', () => {
			(function () {
				assert.typeOf(arguments, 'arguments');
			})();
		});
	});
	describe('Объекты', () => {
		it('new Obj instanceof Obj', () => {
			function Cat () { }
			assert.instanceOf(new Cat, Cat);
			assert.instanceOf({a: 1}, Object);
			assert.instanceOf([1, 2, 3], Array);
			assert.instanceOf(() => {}, Function);
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

			assert.property(obj, 'a');
			assert.propertyVal(obj, 'a', 1);
			assert.deepPropertyVal(obj, 'c', {x:1, y:2});
			assert.nestedProperty(obj, 'd[1].b');
			assert.nestedPropertyVal(obj, 'd[1].b', 22);
			assert.deepNestedPropertyVal(obj, 'd[1]', {b: 22});
		});
		it('frozen Object', () => {
			let obj = {
				a: 1
			};
			Object.freeze(obj);
			assert.isFrozen(obj);
		});
		it('sealed  Object', () => {
			let sealedObject = Object.seal({});
			let frozenObject = Object.freeze({});
			assert.isSealed(sealedObject);
			assert.isSealed(frozenObject);
		});
		it('extensible Object', () => {
			let obj = {
				a: 1
			};
			assert.isExtensible(obj);
			Object.preventExtensions(obj);
			assert.isNotExtensible(obj);
		});
		it('equal', () => {
			assert.deepEqual({a: 1}, {a: 1});
			assert.deepEqual({a: 1, b: {x: 1, y: 2}}, {a: 1, b: {x: 1, y: 2}});
			assert.notDeepEqual({a: 1}, {a: 2});
			assert.notDeepEqual({a: 1}, {a: 1, b: 2});
		});
		it('object include', () => {
			assert.include({a: 1, b: 2, c: 3}, {a: 1, b: 2});
			assert.deepInclude({a: 1, b: {x: 2, y: 3}}, {b: {x: 2, y: 3}});
		});
		it('keys', () => {
			assert.hasAnyKeys({a: 1, b: 2}, ['a']);
			assert.hasAllKeys({a: 1, b: 2}, ['a', 'b']);
			assert.hasAllKeys({a: 1, b: 2}, {a: 4, b: 5}); // ignore 4 and 5
		});
		it('own', () => {
			function O() {
				this.a = 1;
			}
			O.prototype.b = 2;
			assert.include(new O(), {a: 1});
			assert.include(new O(), {b: 2});
			assert.ownInclude(new O(), {a: 1});
			assert.notOwnInclude(new O(), {b: 2});
		});
	});
	describe('Error', () => {
		it('throw Error', () => {
			assert.throws(() => {
				throw new Error('Ошибка');
			});
			assert.throws(() => {
				throw new TypeError('Ошибка');
			});
		});
	});
});