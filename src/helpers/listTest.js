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
});
      `,
      "assertChai": `
it('1 + 2 = 3', () => {
  assert.equal(1 + 2, '3');
});
      `,
      "jest": undefined
    },
    {
      "key": "0:1",
      "name": "name",
      "description": "",
      "expectChai": `

      `,
      "assertChai": `

      `,
      "jest": `

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
      "key": "1:2",
      "name": "name",
      "description": "",
      "expectChai": `

      `,
      "assertChai": `

      `,
      "jest": `

      `
    },
  ]
},
];

export default listTest;