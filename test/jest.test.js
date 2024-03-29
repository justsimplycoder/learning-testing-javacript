const {expect, test, describe} = require('@jest/globals');

describe('Тесты Jest', () => {
	describe('Примитивные значения', () => {
		test('x === y', () => {
			expect(1 + 2).toBe(3);
			expect(1 + 2).toEqual(3);
			expect(1 + 2).toStrictEqual(3);
		});
		test('x == y', () => {
			expect(1 + 2 == '3').toBe(true);
		});
		test('x === true', () => {
			expect(true).toBe(true);
		});
		test('x === false', () => {
			expect(false).toBe(false);
		});
		// false, 0, '', null, undefined и NaN - ложные значения
		test('x == true', () => {
			expect(true).toBeTruthy();
			expect(1).toBeTruthy();
			expect(true).toBeTruthy();
			expect([]).toBeTruthy();
		});
		test('x == false', () => {
			expect(false).toBeFalsy();
			expect(0).toBeFalsy();
			expect('').toBeFalsy();
			expect(null).toBeFalsy();
			expect(undefined).toBeFalsy();
			expect(NaN).toBeFalsy();
		});
		test('x === NaN', () => {
			expect(NaN).toBeNaN();
		});
		test('x === finite', () => {
			expect(Number.isFinite(1)).toBe(true);
		});
		test('x !== null && x !== undefined', () => {
			expect(1).toEqual(expect.anything());
			expect(undefined).not.toEqual(expect.anything());
			expect(null).not.toEqual(expect.anything());
		});
		test('x !== undefined', () => {
			let x = null;
			expect(x).toBeDefined();
		});
		test('x > y', () => {
			expect(11).toBeGreaterThan(10);
			expect(new Date(2000, 12, 17).valueOf()).toBeGreaterThan(new Date(2000, 12, 16).valueOf());
		});
		test('x >= y', () => {
			expect(11).toBeGreaterThanOrEqual(10);
			expect(10).toBeGreaterThanOrEqual(10);
		});
		test('x < y', () => {
			expect(10).toBeLessThan(11);
		});
		test('x <= y', () => {
			expect(10).toBeLessThanOrEqual(11);
			expect(11).toBeLessThanOrEqual(11);
		});
		test('float x === float y', () => {
			const value = 0.1 + 0.2;
			expect(value).toBeCloseTo(0.3);
		});
		test('empty', () => {
			expect({}).toEqual({});
			expect([]).toEqual([]);
			expect('').toEqual('');
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
		test('type array', () => {
			expect(Array.isArray([1, 2, 3])).toBe(true);
			expect([1, 2, 3]).toEqual(expect.any(Array));
			expect([1, 2, 3]).toBeInstanceOf(Array);
		});
		test('type object', () => {
			expect(typeof {a: 1}).toBe('object');
			expect({a: 1}).toEqual(expect.any(Object));
		});
		test('type undefined', () => {
			expect(typeof undefined).toBe('undefined');
			expect(undefined).toBeUndefined();
		});
		test('type function', () => {
			const f = () => {}
			expect(typeof f).toBe('function');
			expect(f).toEqual(expect.any(Function));
		});
		test('type regexp', () => {
			expect(/tea/).toEqual(expect.any(RegExp));
		});
		test('type promise', () => {
			expect(Promise.resolve()).toEqual(expect.any(Promise));
		});
		test('type myCustomType', () => {
			const myObj = {
				[Symbol.toStringTag]: 'myCustomType'
			};
			expect(Object.prototype.toString.call(myObj)).toBe('[object myCustomType]');
		});
	});
	describe('Объекты', () => {
		test('new Obj instanceof Obj', () => {
			function Cat () { }
			expect(new Cat).toEqual(expect.any(Cat));
			expect({a: 1}).toEqual(expect.any(Object));
			expect([1, 2, 3]).toEqual(expect.any(Array));
			expect(() => {}).toEqual(expect.any(Function));

			expect(new Cat).toBeInstanceOf(Cat);
			expect({a: 1}).toBeInstanceOf(Object);
			expect([1, 2, 3]).toBeInstanceOf(Array);
			expect(() => {}).toBeInstanceOf(Function);
		});
		test('property Object', () => {
			const obj = {
				a: 1,
				b: [1, 2, 3],
				c: {
					x: 1,
					y: 2
				},
				d: [{a: 11}, {b: 22}, {c: 33}]
			};

			expect(obj).toHaveProperty('a');
			expect(obj).toHaveProperty('a', 1);
			expect(obj).toHaveProperty('c', {x: 1, y: 2});
			expect(obj).toHaveProperty('d[1].b');
			expect(obj).toHaveProperty('d[1].b', 22);
			expect(obj).toHaveProperty('d[1]', {b: 22});
		});
		test('frozen Object', () => {
			let obj = {
				a: 1
			};
			Object.freeze(obj);
			expect(Object.isFrozen(obj)).toBe(true);
		});
		test('sealed  Object', () => {
			let sealedObject = Object.seal({});
			let frozenObject = Object.freeze({});
			expect(Object.isSealed(sealedObject)).toBe(true);
			expect(Object.isSealed(frozenObject)).toBe(true);
		});
		test('extensible Object', () => {
			let obj = {
				a: 1
			};
			expect(Object.isExtensible(obj)).toBe(true);
			Object.preventExtensions(obj);
			expect(Object.isExtensible(obj)).toBe(false);
		});
		test('equal', () => {
			expect({a: 1}).toEqual({a: 1});
			expect({a: 1, b: {x: 1, y: 2}}).toEqual({a: 1, b: {x: 1, y: 2}});
			expect({a: 1}).not.toEqual({a: 1, b: 2});
			expect({a: 1}).not.toEqual({a: 2});
		});
		test('object include', () => {
			expect({a: 1, b: 2, c: 3}).toEqual(
				expect.objectContaining({a: 1, b: 2})
			);
			expect({a: 1, b: {x: 2, y: 3}}).toEqual(
				expect.objectContaining({b: {x: 2, y: 3}})
			);
		});
		test('getOwnPropertyDescriptors', () => {
			expect(Object.getOwnPropertyDescriptors({a: 1})).toMatchObject({
				a: {
					configurable: true,
					enumerable: true,
					writable: true,
					value: 1,
				}
			});
		});
		test('keys', () => {
			expect({a: 1, b: 2}).toHaveProperty('a');
			expect(Object.keys({a: 1, b: 2})).toEqual(expect.arrayContaining(['a', 'b']));
			expect({a: 1, b: 2}).toMatchObject(expect.objectContaining({
				a: expect.any(Number),
				b: expect.any(Number),
			}));
			expect(Object.keys({a: 1, b: 2})).toEqual(expect.arrayContaining(
				Object.keys({a: 3, b: 4})
			));
		});
		test('own', () => {
			function O() {
				this.a = 1;
			}
			O.prototype.b = 2;
			expect(new O()).toHaveProperty('a');
			expect(new O()).toHaveProperty('b');
			expect(Object.hasOwn(new O(), 'a')).toBe(true);
			expect(new O()).toEqual(
				expect.objectContaining({a: 1})
			);;
			expect(Object.hasOwn(new O(), 'b')).toBe(false);
			expect(new O()).toEqual(
				expect.objectContaining({b: 2})
			);;
		});
	});
	describe('Массивы', () => {
		test('array include', () => {
			expect([1, 2, 3]).toContain(2);
			expect([1, [2, 3]]).toContainEqual([2, 3]);
		});
		test('keys', () => {
			expect(['x', 'y'][1]).toBeDefined();
			expect(Object.keys(['x', 'y']).map(i => parseInt(i))).toEqual(expect.arrayContaining([0, 1]));
			expect(Object.keys(['x', 'y'])).toEqual(expect.arrayContaining(
				Object.keys({0: 4, 1: 5})
			));
		});
		test('equal array', () => {
			expect([1, 2]).toEqual([1, 2]);
			expect([{x: 1, y: 3}, {x: 2, y: 4}]).toEqual([{x: 1, y: 3}, {x: 2, y: 4}]);
		});
		test('order element', () => {
			expect([1, 2]).toEqual([1, 2]);
			// Для игнорирования положения элемента можно применить сортировку
			// expect([1, 2].sort()).toEqual([1, 2].sort());
			// или
			// expect([1, 2]).toEqual(expect.arrayContaining([2, 1]));
			// expect([1, 2].length).toBe([2, 1].length);
			expect([{a: 1}, {b: 2}, {c: 3}]).toEqual([{a: 1}, {b: 2}, {c: 3}]);
		});
	});
	describe('Разное', () => {
		test('length', () => {
			expect([1, 2, 3]).toHaveLength(3);
			expect('text').toHaveLength(4);
			// Не будет работать
			// expect(new Set([1, 2, 3])).toHaveLength(3);
			// expect(new Map([['a', 1], ['b', 2], ['c', 3]])).toHaveLength(3);
			expect(new Set([1, 2, 3]).size).toBe(3);
			expect(new Map([['a', 1], ['b', 2], ['c', 3]]).size).toBe(3);
		});
		test('match', () => {
			expect('foobar').toMatch(/^foo/);
		});
		test('string include', () => {
			expect('foobar').toEqual(expect.stringContaining('bar'));
			expect('foobar').toContain('bar');
		});
		test('throw Error', () => {
			expect(() => {
				throw new Error('Ошибка');
			}).toThrow();
			expect(() => {
				throw new TypeError('Ошибка');
			}).toThrow();
		});
	});
});