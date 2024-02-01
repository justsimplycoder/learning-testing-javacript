const {expect, assert} = require('chai');

// it.only - пропускает тест
// it.skip - не запускает тест, в ожидании
describe('Тесты', () => {
	// Включает нотацию с точками и скобками во всех утверждениях .property и .include, которые следуют в цепочке.
	it('.nested', () => {
		expect({a: {b: ['x', 'y']}}).to.have.nested.property("a.b[1]");
		expect({a: {b: ['x', 'y']}}).to.nested.property("a.b[1]", "y");
	});
	// Утверждает, что «стог сена» включает в себя «иголку». Может использоваться для подтверждения включения подмножества свойств в объект. Позволяет использовать нотацию с точками и квадратными скобками для ссылки на вложенные свойства. «[]» и «.» в именах свойств можно экранировать двойными обратными косыми чертами.
	it('nestedInclude', () => {
		assert.nestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'x'});
		assert.nestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'x'});
	});
	// Заставляет все утверждения .property и .include, которые следуют в цепочке, игнорировать унаследованные свойства.
	it('.own', () => {
		function O() {
			this.a = 1;
		}
		O.prototype.b = 2;
		expect(new O()).to.include({a: 1})
		expect(new O()).to.own.include({a: 1})
		expect(new O()).to.include({b: 2})
		expect(new O()).to.not.own.include({b: 2})
		expect(new O()).to.include({b: 2}).but.not.own.include({b: 2});
	});
	// Заставляет все утверждения .members, следующие в цепочке, требовать, чтобы элементы были в одном и том же порядке.
	it('.ordered', () => {
		expect([1, 2]).to.have.ordered.members([1, 2])
			.but.not.have.ordered.members([2, 1]);
		expect([1, 2, 3]).to.include.ordered.members([1, 2])
			.but.not.include.ordered.members([2, 3]);
	});
	// Когда целью является строка или массив, .empty утверждает, что свойство длины цели строго (===) равно 0
	it('.empty', () => {
		expect({}).to.be.empty;
		expect([]).to.be.empty;
		expect('').to.be.empty;
		assert.isEmpty({});
		assert.isEmpty([]);
		assert.isEmpty('');
	});
	// Утверждает, что цель глубоко равна данному объекту.
	it('.eql, .deepEqual', () => {
		expect([1, 2]).to.deep.equal([1, 2]);
		expect([1, 2]).to.eql([1, 2]);
		assert.deepEqual([1, 2], [1, 2]);
		assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' })
	});
	// Утверждает, что целевой объект, массив, карта или набор имеют заданные ключи. В поиск включаются только собственные унаследованные свойства цели.
	it('.keys', () => {
		expect(['x', 'y']).to.have.all.keys(0, 1);
		expect(['x', 'y']).to.have.all.keys([0, 1]);
		expect(['x', 'y']).to.have.all.keys({0: 4, 1: 5}); // ignore 4 and 5
	});
	// Утверждает, что целевой массив имеет те же элементы, что и заданный набор массивов.
	it('.members', () => {
		expect([{a: 1}]).to.have.deep.members([{a: 1}]);
		assert.sameDeepMembers([{a: 1}], [{a: 1}]);
		expect([1, 2, 3]).to.have.members([2, 1, 3]);
		assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ]);
		expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
		assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ]);
		expect([1, 2, 3]).to.include.members([1, 2]);
		assert.includeMembers([1, 2, 3], [1, 2]);
		expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
		assert.includeMembers([1, 2, 3], [1, 2, 2, 2]);
		expect([{a: 1}, {b: 2}, {c: 3}]).to.include.deep.ordered.members([{a: 1}, {b: 2}]);
		assert.includeDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}]);
		assert.sameDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}, {c: 3}]);
	});
});