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
});
      `,
      "assertChai": `
it('array include', () => {
  assert.include([1, 2, 3], 2);
});
      `,
      "jest": `
it('array include', () => {
  expect([1, 2, 3]).toContain(2);
});
      `
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

  ]
},
];

export default listTest;