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