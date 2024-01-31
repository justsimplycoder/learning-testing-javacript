const listTest = [
{
  "key": 0,
  "title": "Примитивные значения",
  "visible": true,
  "content": [
    {
      "key": "0:0",
      "name": "x === y",
      "description": "Строгое сравнение примитивных значений",
      "expectChai": `
it('1 + 2 = 3', () => {
  expect(1 + 2).to.equal(3);
});
      `,
      "assertChai": `
it('1 + 2 = 3', () => {
  assert.strictEqual(1 + 2, 3);
});
      `,
      "jest": `
test('1 + 2 = 3', () => {
  expect(1 + 2).toBe(3);
});
      `
    },
    {
      "key": "0:1",
      "name": "x == y",
      "description": "Нестрогое сравнение примитивных значений",
      "expectChai": `
it('1 + 2 = 3', () => {
  expect(1 + 2).to.satisfy((num) => num == 3);
  expect(1 + 2 == '3').to.be.true;
});
      `,
      "assertChai": `
it('1 + 2 = 3', () => {
  assert.equal(1 + 2, '3');
});
      `,
      "jest": `
test('x == y', () => {
  expect(1 + 2 == '3').toBe(true);
});
      `
    },
    {
      "key": "0:2",
      "name": "x === true",
      "description": "Строгое сравнение на истинность",
      "expectChai": `
it('x === true', () => {
  expect(true).to.be.true;
});
      `,
      "assertChai": `
it('x === true', () => {
  assert.isTrue(true);
});
      `,
      "jest": `
test('x === true', () => {
  expect(true).toBe(true);
});
      `
    },
    {
      "key": "0:3",
      "name": "x === false",
      "description": "Строгое сравнение на ложность",
      "expectChai": `
it('x === false', () => {
  expect(false).to.be.false;
});
      `,
      "assertChai": `
it('x === false', () => {
  assert.isFalse(false);
});
      `,
      "jest": `
test('x === false', () => {
  expect(false).toBe(false);
});
      `
    },
    {
      "key": "0:4",
      "name": "x == true",
      "description": "Нестрогое сравнение на истинность. Всё кроме false, 0, '', null, undefined и NaN даёт true.",
      "expectChai": `
it('x == true', () => {
  expect(true).to.be.ok;
  expect(1).to.be.ok;
  expect('text').to.be.ok;
  expect([]).to.be.ok;
});
      `,
      "assertChai": `
it('x == true', () => {
  assert.isOk(true);
  assert.isOk(1);
  assert.isOk('text');
  assert.isOk([]);
});
      `,
      "jest": `
test('x == true', () => {
  expect(true).toBeTruthy();
  expect(1).toBeTruthy();
  expect(true).toBeTruthy();
  expect([]).toBeTruthy();
});
      `
    },
    {
      "key": "0:5",
      "name": "x == false",
      "description": "Нестрогое сравнение на ложность. Значения false, 0, '', null, undefined и NaN дают false.",
      "expectChai": `
it('x == false', () => {
  expect(false).to.be.not.ok;
  expect(0).to.be.not.ok;
  expect('').to.be.not.ok;
  expect(null).to.be.not.ok;
  expect(undefined).to.be.not.ok;
  expect(NaN).to.be.not.ok;
});
      `,
      "assertChai": `
it('x == false', () => {
  assert.isNotOk(false);
  assert.isNotOk(0);
  assert.isNotOk('');
  assert.isNotOk(null);
  assert.isNotOk(undefined);
  assert.isNotOk(NaN);
});
      `,
      "jest": `
test('x == false', () => {
  expect(false).toBeFalsy();
  expect(0).toBeFalsy();
  expect('').toBeFalsy();
  expect(null).toBeFalsy();
  expect(undefined).toBeFalsy();
  expect(NaN).toBeFalsy();
});
      `
    },
    {
      "key": "0:6",
      "name": "x === NaN",
      "description": "Значение не число (NaN)",
      "expectChai": `
it('x === NaN', () => {
  expect(NaN).to.be.NaN;
});
      `,
      "assertChai": `
it('x === NaN', () => {
  assert.isNaN(NaN);
});
      `,
      "jest": `
test('x === NaN', () => {
  expect(NaN).toBeNaN();
});
      `
    },
    {
      "key": "0:7",
      "name": "x === finite",
      "description": "Является ли значение конечным числом, с NaN и Infinity это не удастся.",
      "expectChai": `
it('x === finite', () => {
  expect(1).to.be.finite;
});
      `,
      "assertChai": `
it('x === finite', () => {
  assert.isFinite(1);
});
      `,
      "jest": `
test('x === finite', () => {
  expect(Number.isFinite(1)).toBe(true);
});
      `
    },
    {
      "key": "0:8",
      "name": "x !== null && x !== undefined",
      "description": "Утверждает, что цель не является строго (===) равной null или undefined.",
      "expectChai": `
it('x !== null && x !== undefined', () => {
  expect(1).to.exist;
  expect(undefined).to.not.exist;
  expect(null).to.not.exist;
});
      `,
      "assertChai": `
it('x !== null && x !== undefined', () => {
  assert.exists(1);
  assert.notExists(undefined);
  assert.notExists(null);
});
      `,
      "jest": `
test('x !== null && x !== undefined', () => {
  expect(1).toEqual(expect.anything());
  expect(undefined).not.toEqual(expect.anything());
  expect(null).not.toEqual(expect.anything());
});
      `
    },
    {
      "key": "0:9",
      "name": "x !== undefined",
      "description": "Переменная определена.",
      "expectChai": `
it('x !== undefined', () => {
  let x = null;
  expect(x).to.not.be.undefined;
});;
      `,
      "assertChai": `
it('x !== undefined', () => {
  let x = null;
  assert.isDefined(x);
});
      `,
      "jest": `
test('x !== undefined', () => {
  let x = null;
  expect(x).toBeDefined();
});
      `
    },
    {
      "key": "0:10",
      "name": "x > y",
      "description": "Сравнение больше",
      "expectChai": `
it('x !== undefined', () => {
  let x = null;
  expect(x).to.not.be.undefined;
});;
      `,
      "assertChai": `
it('x > y', () => {
  assert.isAbove(11, 10);
  assert.isAbove(new Date(2000, 12, 17), new Date(2000, 12, 16));
});
      `,
      "jest": `
test('x > y', () => {
  expect(11).toBeGreaterThan(10);
  expect(new Date(2000, 12, 17).valueOf()).toBeGreaterThan(new Date(2000, 12, 16).valueOf());
});
      `
    },
    {
      "key": "0:11",
      "name": "x >= y",
      "description": "Сравнение больше равно",
      "expectChai": `
it('x >= y', () => {
  expect(11).to.be.at.least(10);
  expect(10).to.be.at.least(10);
});
      `,
      "assertChai": `
it('x >= y', () => {
  assert.isAtLeast(11, 10);
  assert.isAtLeast(11, 11);
});
      `,
      "jest": `
test('x >= y', () => {
  expect(11).toBeGreaterThanOrEqual(10);
  expect(10).toBeGreaterThanOrEqual(10);
});
      `
    },
    {
      "key": "0:12",
      "name": "x < y",
      "description": "Сравнение меньше",
      "expectChai": `
it('x < y', () => {
  expect(10).to.be.at.below(11);
});
      `,
      "assertChai": `
it('x < y', () => {
  assert.isBelow(10, 11);
});
      `,
      "jest": `
test('x < y', () => {
  expect(10).toBeLessThan(11);
});
      `
    },
    {
      "key": "0:13",
      "name": "x <= y",
      "description": "Сравнение меньше равно",
      "expectChai": `
it('x <= y', () => {
  expect(10).to.be.at.most(11);
  expect(11).to.be.at.most(11);
});
      `,
      "assertChai": `
it('x <= y', () => {
  assert.isAtMost(10, 11);
  assert.isAtMost(11, 11);
});
      `,
      "jest": `
test('x <= y', () => {
  expect(10).toBeLessThanOrEqual(11);
  expect(11).toBeLessThanOrEqual(11);
});
      `
    },
    {
      "key": "0:14",
      "name": "x <= z <= y",
      "description": "Диапазон.",
      "expectChai": `
it('x <= z <= y', () => {
  expect(2).to.be.within(1, 3);
  expect(2).to.be.within(2, 3);
  expect(2).to.be.within(1, 2);
  expect('foo').to.have.lengthOf.within(2, 4);
  expect([1, 2, 3]).to.have.lengthOf.within(2, 4);
});
      `,
      "assertChai": undefined,
      "jest": undefined
    },
    {
      "key": "0:15",
      "name": "float x === float y",
      "description": "Сравнение чисел с плавающей точкой.",
      "expectChai": `
it('float x === float y', () => {
  const value = 0.1 + 0.2;
  expect(value).to.be.closeTo(0.3, 0.0000000001);
  expect(value).to.almost.equal(0.3); // расширение chai-almost
});
      `,
      "assertChai": `
it('float x === float y', () => {
  const value = 0.1 + 0.2;
  assert.closeTo(value, 0.3, 0.0000000001);
});
      `,
      "jest": `
test('float x === float y', () => {
  const value = 0.1 + 0.2;
  expect(value).toBeCloseTo(0.3);
});
      `
    },

  ]
},
{
  "key": 1,
  "title": "Проверка типов",
  "visible": true,
  "content": [
    {
      "key": "1:0",
      "name": "type string",
      "description": "Тип 'string'",
      "expectChai": `
it('type string', () => {
  expect('text').to.be.a('string');
});
      `,
      "assertChai": `
it('type string', () => {
  assert.typeOf('text', 'string');
  assert.isString('text');
});
      `,
      "jest": `
test('type string', () => {
  expect(typeof 'text').toBe('string');
  expect('text').toEqual(expect.any(String));
});
      `
    },
    {
      "key": "1:1",
      "name": "type number",
      "description": "Тип 'number'",
      "expectChai": `
it('type number', () => {
  expect(3.14).to.be.a('number');
  expect(Infinity).to.be.a('number');
  expect(NaN).to.be.a('number');
});
      `,
      "assertChai": `
it('type number', () => {
  assert.typeOf(3.14, 'number');
  assert.isNumber(NaN);
  assert.isNumber(Infinity);
});
      `,
      "jest": `
test('type number', () => {
  expect(typeof 3.14).toBe('number');
  expect(Infinity).toEqual(expect.any(Number));
  expect(NaN).toEqual(expect.any(Number));
});
      `
    },
    {
      "key": "1:2",
      "name": "type boolean",
      "description": "Тип 'boolean'",
      "expectChai": `
it('type boolean', () => {
  expect(true).to.be.a('boolean');
});
      `,
      "assertChai": `
it('type boolean', () => {
  assert.typeOf(true, 'boolean');
  assert.isBoolean(true);
});
      `,
      "jest": `
test('type boolean', () => {
  expect(typeof true).toBe('boolean');
  expect(true).toEqual(expect.any(Boolean));
});
      `
    },
    {
      "key": "1:3",
      "name": "type null",
      "description": "Тип 'null'",
      "expectChai": `
it('type null', () => {
  expect(null).to.be.a('null');
  expect(null).to.be.null;
});
      `,
      "assertChai": `
it('type null', () => {
  assert.typeOf(null, 'null');
  assert.isNull(null);
});
      `,
      "jest": `
test('type null', () => {
  expect(null).toBeNull();
});
      `
    },
    {
      "key": "1:4",
      "name": "type array",
      "description": "Тип 'array'",
      "expectChai": `
it('type array', () => {
  expect([1, 2, 3]).to.be.an('array');
});
      `,
      "assertChai": `
it('type array', () => {
  assert.typeOf([1, 2, 3], 'array');
  assert.isArray([1, 2, 3]);
});
      `,
      "jest": `
test('type array', () => {
  expect(Array.isArray([1, 2, 3])).toBe(true);
  expect([1, 2, 3]).toEqual(expect.any(Array));
  expect([1, 2, 3]).toBeInstanceOf(Array);
});
      `
    },
    {
      "key": "1:5",
      "name": "type object",
      "description": "Тип object",
      "expectChai": `
it('type object', () => {
  expect({a: 1}).to.be.an('object');
});
      `,
      "assertChai": `
it('type object', () => {
  assert.typeOf({a: 1}, 'object');
  assert.isObject({a: 1});
});
      `,
      "jest": `
test('type object', () => {
  expect(typeof {a: 1}).toBe('object');
  expect({a: 1}).toEqual(expect.any(Object));
});
      `
    },
    {
      "key": "1:6",
      "name": "type undefined",
      "description": "Тип undefined",
      "expectChai": `
it('type undefined', () => {
  expect(undefined).to.be.an('undefined');
  expect(undefined).to.be.undefined;
});
      `,
      "assertChai": `
it('type undefined', () => {
  assert.typeOf(undefined, 'undefined');
  assert.isUndefined(undefined);
});
      `,
      "jest": `
test('type undefined', () => {
  expect(typeof undefined).toBe('undefined');
  expect(undefined).toBeUndefined();
});
      `
    },
    {
      "key": "1:7",
      "name": "type function",
      "description": "Тип function",
      "expectChai": `
it('type function', () => {
  const f = () => {};
  expect(f).to.be.a('function');
});
      `,
      "assertChai": `
it('type function', () => {
  const f = () => {};
  assert.typeOf(f, 'function');
  assert.isFunction(f);
});
      `,
      "jest": `
test('type function', () => {
  const f = () => {}
  expect(typeof f).toBe('function');
  expect(f).toEqual(expect.any(Function));
});
      `
    },
    {
      "key": "1:8",
      "name": "type regexp",
      "description": "Тип regexp",
      "expectChai": `
it('type regexp', () => {
  expect(/tes/).to.be.a('regexp');
});
      `,
      "assertChai": `
it('type regexp', () => {
  assert.typeOf(/tea/, 'regexp');
});
      `,
      "jest": `
test('type regexp', () => {
  expect(/tea/).toEqual(expect.any(RegExp));
});
      `
    },
    {
      "key": "1:9",
      "name": "type promise",
      "description": "Тип promise",
      "expectChai": `
it('type promise', () => {
  expect(Promise.resolve()).to.be.a('promise');
});
      `,
      "assertChai": `
it('type promise', () => {
  assert.typeOf(Promise.resolve(), 'promise');
});
      `,
      "jest": `
test('type promise', () => {
  expect(Promise.resolve()).toEqual(expect.any(Promise));
});
      `
    },
    {
      "key": "1:10",
      "name": "custom type",
      "description": "Тип пользовательский",
      "expectChai": `
it('type myCustomType', () => {
  const myObj = {
    [Symbol.toStringTag]: 'myCustomType'
  };
  expect(myObj).to.be.a('myCustomType');
});
      `,
      "assertChai": `
it('type myCustomType', () => {
  const myObj = {
    [Symbol.toStringTag]: 'myCustomType'
  };
  assert.typeOf(myObj, 'myCustomType');
});
      `,
      "jest": `
test('type myCustomType', () => {
  const myObj = {
    [Symbol.toStringTag]: 'myCustomType'
  };
  expect(Object.prototype.toString.call(myObj)).toBe('[object myCustomType]');
});
      `
    },
  ]
},
{
  "key": 2,
  "title": "Разное",
  "visible": true,
  "content": [
    {
      "key": "2:0",
      "name": "length",
      "description": "Длина значения",
      "expectChai": `
it('length', () => {
  expect([1, 2, 3]).to.have.lengthOf(3);
  expect('text').to.have.lengthOf(4);
  expect(new Set([1, 2, 3])).to.have.lengthOf(3);
  expect(new Map([['a', 1], ['b', 2], ['c', 3]])).to.have.lengthOf(3);
});
      `,
      "assertChai": `
it('length', () => {
  assert.lengthOf([1, 2, 3], 3);
  assert.lengthOf('text', 4);
  assert.lengthOf(new Set([1, 2, 3]), 3);
  assert.lengthOf(new Map([['a', 1], ['b', 2], ['c', 3]]), 3);
});
      `,
      "jest": `
test('length', () => {
  expect([1, 2, 3]).toHaveLength(3);
  expect('text').toHaveLength(4);
  // Не будет работать
  // expect(new Set([1, 2, 3])).toHaveLength(3);
  // expect(new Map([['a', 1], ['b', 2], ['c', 3]])).toHaveLength(3);
  expect(new Set([1, 2, 3]).size).toBe(3);
  expect(new Map([['a', 1], ['b', 2], ['c', 3]]).size).toBe(3);
});
      `
    },
    {
      "key": "2:1",
      "name": "match",
      "description": "Соответствие регулярному выражению",
      "expectChai": `
it('match', () => {
  expect('foobar').to.match(/^foo/);
});
      `,
      "assertChai": `
it('match', () => {
  assert.match('foobar', /^foo/);
});
      `,
      "jest": `
test('match', () => {
  expect('foobar').toMatch(/^foo/);
});
      `
    },
    {
      "key": "2:2",
      "name": "string include",
      "description": "Утверждает что целевая строка содержит подстроку.",
      "expectChai": `
it('string include', () => {
  expect('foobar').to.have.string('bar');
  expect('foobar').to.include.string('bar');
});
      `,
      "assertChai": `
it('string include', () => {
  assert.include('foobar', 'bar');
});
      `,
      "jest": `
it('string include', () => {
  expect('foobar').toEqual(expect.stringContaining('bar'));
  expect('foobar').toContain('bar');
});
      `
    },
    {
      "key": "2:3",
      "name": "array include",
      "description": "Утверждает что элемент присутствует в массиве.",
      "expectChai": `
it('array include', () => {
  expect([1, 2, 3]).to.include(2);
  expect(1).to.be.oneOf([1, 2, 3]);
  expect([1, [2, 3]]).to.deep.include([2, 3]);
});
      `,
      "assertChai": `
it('array include', () => {
  assert.include([1, 2, 3], 2);
  assert.oneOf(1, [1, 2, 3]);
  assert.deepInclude([1, [2, 3]], [2, 3]);
});
      `,
      "jest": `
it('array include', () => {
  expect([1, 2, 3]).toContain(2);
  expect([1, [2, 3]]).toContainEqual([2, 3]);
});
      `
    },
    {
      "key": "2:4",
      "name": "close to",
      "description": "Утверждает что число, которое находится в заданном диапазоне +/- дельта от заданного ожидаемого числа.",
      "expectChai": `
it('close to', () => {
  expect(1.5).to.be.closeTo(1, 0.5);
  expect(1.5).to.be.closeTo(2, 0.5);
  expect(1.5).to.be.closeTo(1, 1);
  expect(1.5).to.be.closeTo(1, 3);
  expect(1.5).to.not.be.closeTo(1, 0.4);
});
      `,
      "assertChai": `
it('close to', () => {
  assert.closeTo(1.5, 1, 0.5);
  assert.closeTo(1.5, 2, 0.5);
  assert.closeTo(1.5, 1, 1);
  assert.closeTo(1.5, 1, 3);
});
      `,
      "jest": undefined
    },
    {
      "key": "2:5",
      "name": "arguments function",
      "description": "Утверждает, что целью является объект arguments.",
      "expectChai": `
it('arguments function', () => {
  (function () {
    expect(arguments).to.be.arguments;
  })();
});
      `,
      "assertChai": `
it('arguments function', () => {
  (function () {
    assert.typeOf(arguments, 'arguments');
  })();
});
      `,
      "jest": undefined
    },
  ]
},
{
  "key": 3,
  "title": "Объекты",
  "visible": true,
  "content": [
    {
      "key": "3:0",
      "name": "new Obj instanceof Obj",
      "description": "Соответствует всему что было создано с помощью указанного конструктора.",
      "expectChai": `
it('new Obj instanceof Obj', () => {
  function Cat () { }
  expect(new Cat()).to.be.a.instanceof(Cat);
  expect({a: 1}).to.be.an.instanceof(Object);
  expect([1, 2, 3]).to.be.an.instanceof(Array);
  expect(() => {}).to.be.a.instanceof(Function);
});
      `,
      "assertChai": `
it('new Obj instanceof Obj', () => {
  function Cat () { }
  assert.instanceOf(new Cat, Cat);
  assert.instanceOf({a: 1}, Object);
  assert.instanceOf([1, 2, 3], Array);
  assert.instanceOf(() => {}, Function);
});
      `,
      "jest": `
test('new Obj instanceof Obj', () => {
  function Cat () { }
  expect(new Cat).toEqual(expect.any(Cat));
  expect({a: 1}).toEqual(expect.any(Object));
  expect([1, 2, 3]).toEqual(expect.any(Array));
  expect(() => {}).toEqual(expect.any(Function));
});
      `
    },
    {
      "key": "3:1",
      "name": "property Object",
      "description": "Наличие свойства и его значение в объекте.",
      "expectChai": `
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
      `,
      "assertChai": `
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
      `,
      "jest": `
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
      `
    },
    {
      "key": "3:2",
      "name": "frozen Object",
      "description": "Объект заморожен.",
      "expectChai": `
it('frozen Object', () => {
  let obj = {
    a: 1
  };
  Object.freeze(obj);
  expect(obj).to.be.frozen;
});
      `,
      "assertChai": `
it('frozen Object', () => {
  let obj = {
    a: 1
  };
  Object.freeze(obj);
  assert.isFrozen(obj);
});
      `,
      "jest": `
test('frozen Object', () => {
  let obj = {
    a: 1
  };
  Object.freeze(obj);
  expect(Object.isFrozen(obj)).toBe(true);
});
      `
    },
    {
      "key": "3:3",
      "name": "sealed Object",
      "description": "Объект запечатан.",
      "expectChai": `
it('sealed  Object', () => {
  let sealedObject = Object.seal({});
  let frozenObject = Object.freeze({});
  expect(sealedObject).to.be.sealed;
  expect(frozenObject).to.be.sealed;
});
      `,
      "assertChai": `
it('sealed  Object', () => {
  let sealedObject = Object.seal({});
  let frozenObject = Object.freeze({});
  assert.isSealed(sealedObject);
  assert.isSealed(frozenObject);
});
      `,
      "jest": `
test('sealed  Object', () => {
  let sealedObject = Object.seal({});
  let frozenObject = Object.freeze({});
  expect(Object.isSealed(sealedObject)).toBe(true);
  expect(Object.isSealed(frozenObject)).toBe(true);
});
      `
    },
    {
      "key": "3:4",
      "name": "extensible Object",
      "description": "Объект расширяемый.",
      "expectChai": `
it('extensible Object', () => {
  let obj = {
    a: 1
  };
  expect(obj).to.be.extensible;
  Object.preventExtensions(obj);
  expect(obj).to.not.be.extensible;
});
      `,
      "assertChai": `
it('extensible Object', () => {
  let obj = {
    a: 1
  };
  assert.isExtensible(obj);
  Object.preventExtensions(obj);
  assert.isNotExtensible(obj);
});
      `,
      "jest": `
test('extensible Object', () => {
  let obj = {
    a: 1
  };
  expect(Object.isExtensible(obj)).toBe(true);
  Object.preventExtensions(obj);
  expect(Object.isExtensible(obj)).toBe(false);
});
      `
    },
    {
      "key": "3:5",
      "name": "equal",
      "description": "Утверждает, что данные объектов равны.",
      "expectChai": `
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
      `,
      "assertChai": `
it('equal', () => {
  assert.deepEqual({a: 1}, {a: 1});
  assert.deepEqual({a: 1, b: {x: 1, y: 2}}, {a: 1, b: {x: 1, y: 2}});
  assert.notDeepEqual({a: 1}, {a: 2});
  assert.notDeepEqual({a: 1}, {a: 1, b: 2});
});
      `,
      "jest": `
test('equal', () => {
  expect({a: 1}).toEqual({a: 1});
  expect({a: 1, b: {x: 1, y: 2}}).toEqual({a: 1, b: {x: 1, y: 2}});
  expect({a: 1}).not.toEqual({a: 1, b: 2});
  expect({a: 1}).not.toEqual({a: 2});
});
      `
    },
    {
      "key": "3:6",
      "name": "object include",
      "description": "Утверждает что элемент присутствует в объекте.",
      "expectChai": `
it('object include', () => {
  expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
  expect({a: 1, b: {x: 2, y: 3}}).to.deep.include({b: {x: 2, y: 3}});
});
      `,
      "assertChai": `
it('object include', () => {
  assert.include({a: 1, b: 2, c: 3}, {a: 1, b: 2});
  assert.deepInclude({a: 1, b: {x: 2, y: 3}}, {b: {x: 2, y: 3}});
});
      `,
      "jest": `
it('object include', () => {
  expect({a: 1, b: 2, c: 3}).toEqual(
    expect.objectContaining({a: 1, b: 2})
  );
  expect({a: 1, b: {x: 2, y: 3}}).toEqual(
    expect.objectContaining({b: {x: 2, y: 3}})
  );
});
      `
    },
    {
      "key": "3:7",
      "name": "getOwnPropertyDescriptors",
      "description": "Утверждает, что цель имеет собственный дескриптор свойства с заданным именем ключа.",
      "expectChai": `
it('getOwnPropertyDescriptors', () => {
  expect({a: 1}).to.have.ownPropertyDescriptor('a', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 1,
  });
});
      `,
      "assertChai": undefined,
      "jest": `
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
      `
    },
    {
      "key": "3:8",
      "name": "keys",
      "description": "Утверждает, что целевой объект имеет заданные ключи.",
      "expectChai": `
it('keys', () => {
  expect({a: 1, b: 2}).to.have.any.keys('a');
  expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
  expect({a: 1, b: 2}).to.have.all.keys(['a', 'b']);
  expect({a: 1, b: 2}).to.have.all.keys({a: 4, b: 5}); // ignore 4 and 5
});
      `,
      "assertChai": `
it('keys', () => {
  assert.hasAnyKeys({a: 1, b: 2}, ['a']);
  assert.hasAllKeys({a: 1, b: 2}, ['a', 'b']);
  assert.hasAllKeys({a: 1, b: 2}, {a: 4, b: 5}); // ignore 4 and 5
});
      `,
      "jest": `
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
      `
    },
  ]
},
{
  "key": 4,
  "title": "Error",
  "visible": true,
  "content": [
    {
      "key": "4:0",
      "name": "throw Error",
      "description": "Проверка на то что функция бросает исключение.",
      "expectChai": `
it('throw Error', () => {
  expect(() => {
    throw new Error('Ошибка');
  }).to.throw();
  expect(() => {
    throw new TypeError('Ошибка');
  }).to.throw();
});
      `,
      "assertChai": `
it('throw Error', () => {
  assert.throws(() => {
    throw new Error('Ошибка');
  });
  assert.throws(() => {
    throw new TypeError('Ошибка');
  });
});
      `,
      "jest": `
test('throw Error', () => {
  expect(() => {
    throw new Error('Ошибка');
  }).toThrow();
  expect(() => {
    throw new TypeError('Ошибка');
  }).toThrow();
});
      `
    },
  ]
},
];

export default listTest;