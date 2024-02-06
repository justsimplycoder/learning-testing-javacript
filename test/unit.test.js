const {expect, assert} = require('chai');

// it.only - пропускает тест
// it.skip - не запускает тест, в ожидании
describe('Тесты', () => {
	// Заставляет все утверждения .members, следующие в цепочке, требовать, чтобы элементы были в одном и том же порядке.
	it('.ordered', () => {
		expect([1, 2]).to.have.ordered.members([1, 2])
			.but.not.have.ordered.members([2, 1]);
		expect([1, 2, 3]).to.include.ordered.members([1, 2])
			.but.not.include.ordered.members([2, 3]);
	});
	// Утверждает, что цель глубоко равна данному объекту.
	it('.eql, .deepEqual', () => {
		expect([1, 2]).to.deep.equal([1, 2]);
		expect([1, 2]).to.eql([1, 2]);
		assert.deepEqual([1, 2], [1, 2]);
		assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' })
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