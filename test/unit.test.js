const {expect, assert} = require('chai');

// it.only - пропускает тест
// it.skip - не запускает тест, в ожидании
describe('Тесты', () => {
	// Отменяет все утверждения, которые следуют в цепочке.
	it('.not', () => {
		expect(() => {}).to.not.throw();
		expect({a: 1}).to.not.have.property('b');
		expect(1).to.not.equal(2);
		assert.notEqual(1, 2);
	});
	// Заставляет все утверждения .equal, .include, .members, .keys и .property, следующие в цепочке, использовать глубокое равенство вместо строгого (===) равенства. См. страницу проекта deep-eql для получения информации об алгоритме глубокого равенства: https://github.com/chaijs/deep-eql.
	it('.deep', () => {
		expect({a: 1}).to.deep.equal({a: 1});
		expect([{a: 1}]).to.deep.include({a: 1});
	});
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
	// Утверждает, что «стог сена» не включает «иголку». Может использоваться для подтверждения отсутствия подмножества свойств в объекте. Позволяет использовать нотацию с точками и квадратными скобками для ссылки на вложенные свойства. «[]» и «.» в именах свойств можно экранировать двойными обратными косыми чертами.
	it('notNestedInclude', () => {
		assert.notNestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'y'});
		assert.notNestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'y'});
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
	// Заставляет все утверждения .keys, которые следуют в цепочке, требовать только, чтобы у цели был хотя бы один из заданных ключей. Это противоположно .all, который требует, чтобы у цели были все заданные ключи.
	it('.any', () => {
		expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
		expect({a: 1, b: 2}).to.have.any.keys('a');
		assert.hasAnyKeys({a: 1, b: 2}, ['a']);
	});
	// ЗЗаставляет все утверждения .keys, которые следуют в цепочке, требовать, чтобы у цели были все заданные ключи. Это противоположно .any, который требует только, чтобы у цели был хотя бы один из заданных ключей.
	it('.all', () => {
		expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
		assert.hasAllKeys({a: 1, b: 2}, ['a', 'b']);
	});
	// Утверждает, что целевой тип равен заданному строковому типу. Типы нечувствительны к регистру.
	it('.a, typeOf', () => {
		expect({a: 1}).to.be.an('object');
		expect({a: 1}).to.be.a('object');
		assert.typeOf({a: 1}, 'object');
		expect([1, 2, 3]).to.be.a('array');
		assert.typeOf([1, 2, 3], 'array');
		expect(undefined).to.be.an('undefined');
		assert.typeOf(undefined, 'undefined');
		expect(new Error).to.be.an('error');
		assert.typeOf(new Error, 'error');
		expect(Promise.resolve()).to.be.a('promise');
		assert.typeOf(Promise.resolve(), 'promise');
		expect(new Float32Array).to.be.a('float32array');
		assert.typeOf(new Float32Array, 'float32array');
		expect(Symbol()).to.be.a('symbol');
		assert.typeOf(Symbol(), 'symbol');
		expect(/tes/).to.be.a('regexp');
		assert.typeOf(/tea/, 'regexp');
		var myObj = {
			[Symbol.toStringTag]: 'myCustomType'
		};
		expect(myObj).to.be.a('myCustomType').but.not.an('object');
		assert.typeOf(myObj, 'myCustomType');
		assert.notTypeOf(myObj, 'object');
	});
	// Когда целью является строка, .include утверждает, что данная строка val является подстрокой цели.
	it('.include', () => {
		expect('foobar').to.include('bar');
		assert.include('foobar', 'bar');
		expect([1, 2, 3]).to.include(2);
		expect([1, 2, 3]).to.be.an('array').that.includes(2);
		assert.include([1, 2, 3], 2);
		expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
		assert.include({a: 1, b: 2, c: 3}, {a: 1, b: 2});
		expect(new Set([1, 2])).to.include(1);
		assert.include(new Set([1, 2]), 1);
		expect(new Map([['a', 1], ['b', 2]])).to.include(1);
		assert(new Map([['a', 1], ['b', 2]]), 1);
		expect([1, 2, 3]).to.not.include(4);
		assert.notInclude([1,2,3], 4);
	});
	// Утверждает, что в стоге сена есть игла. Может использоваться для подтверждения включения значения в массив или подмножества свойств в объект. Используется глубокое равенство.
	it('.deepInclude', () => {
		const obj1 = {a: 1};
		const obj2 = {b: 2};
		assert.deepInclude([obj1, obj2], {a: 1});
		assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
		assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
	});
	// Утверждает, что в стоге сена нет иголки. Может использоваться для подтверждения отсутствия значения в массиве или подмножества свойств в объекте. Используется глубокое равенство.
	it('.notDeepInclude', () => {
		const obj1 = {a: 1};
		const obj2 = {b: 2};
		assert.notDeepInclude([obj1, obj2], {a: 9});
		assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
		assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
	});
	// Утверждает, что цель является истинным значением (считается истинным в логическом контексте). Однако часто лучше утверждать, что цель строго (===) или полностью равна ожидаемому значению.
	it('.ok, .isOk, isNotOk', () => {
		expect(1).to.be.ok;
		assert.isOk(1);
		expect('sdf').to.be.ok;
		assert.isOk('sdf');
		expect({}).to.be.ok;
		assert.isOk({});
		expect(0).to.not.be.ok;
		assert.isNotOk(0);
		expect(null).to.not.be.ok;
		assert.isNotOk(null);
	});
	// Утверждает, что цель строго (===) равна true.
	it('.true, .isTrue', () => {
		expect(true).to.be.true;
		expect(false).to.not.be.true;
	});
	// Утверждает, что цель строго (===) равна false.
	it('.false, .isFalse', () => {
		expect(false).to.be.false;
		expect(true).to.not.be.false;
	});
	// Утверждает, что цель строго (===) равна undefined.
	it('.undefined, isUndefined', () => {
		expect(undefined).to.be.undefined;
		assert.isUndefined(undefined);
	});
	// Утверждает, что цель строго (!==) не равна undefined.
	it('isDefined', () => {
		expect(true).to.not.be.undefined;
		assert.isDefined(true);
	})
	// Утверждает, что целью является именно NaN.
	it('.NaN, .isNaN', () => {
		expect(NaN).to.be.NaN;
		assert.isNaN(NaN);
		expect(true).to.not.be.NaN;
		assert.isNotNaN(true);
	});
	// Утверждает, что цель не является строго (===) равной null или undefined.
	it('.exist, .exists', () => {
		expect(true).to.exist;
		assert.exists(true);
		expect(undefined).to.not.exist;
		expect(null).to.not.exist;
		assert.notExists(undefined);
		assert.notExists(null);
	});
	// Когда целью является строка или массив, .empty утверждает, что свойство длины цели строго (===) равно 0
	it('.empty', () => {
		expect([]).to.be.empty;
		assert.isEmpty([]);
		expect('').to.be.empty;
		assert.isEmpty('');
		expect(new Set()).to.be.empty;
		assert.isEmpty(new Set());
		expect(new Map()).to.be.empty;
		assert.isEmpty(new Map());
		expect({}).to.be.empty;
		assert.isEmpty({});
		expect([1, 2]).to.not.be.empty;
		assert.isNotEmpty([1, 2]);

		expect([]).to.be.an('array').that.is.empty;
		assert.isArray([]);
		assert.isEmpty([]);
	});
	// Утверждает, что значение является функцией.
	it('isFunction', () => {
		assert.isFunction(() => {});
		assert.isFunction(function() {});
		class O {};
		assert.isFunction(O);
		assert.isFunction(function* (){});
	});
	// Утверждает, что значение не является функцией.
	it('isNotFunction', () => {
		assert.isNotFunction([1, 2, 3]);
	});
	// Утверждает, что целью является объект arguments.
	it('.arguments', () => {
		(function () {
			expect(arguments).to.be.arguments;
		})();
	});
	// Утверждает, что значение является объектом типа «Объект» (как показывает Object.prototype.toString). Утверждение не соответствует объектам подкласса.
	it('.isObject', () => {
		assert.isObject({a: 1});
	});
	// Утверждает, что значение не является объектом типа «Объект» (как показывает Object.prototype.toString).
	it('.isNotObject', () => {
		assert.isNotObject([1, 2, 3]);
	});
	// Утверждает, что значение является массивом.
	it('isArray', () => {
		assert.isArray([1, 2, 3]);
	});
	// Утверждает, что значение не является массивом.
	it('isNotArray', () => {
		assert.isNotArray({a: 1});
	});
	// Утверждает, что значение не является строкой.
	it('isNotString', () => {
		assert.isNotString(1);
	});
	// Утверждает, что значение не является числом.
	it('isNotNumber', () => {
		assert.isNotNumber('text');
	});
	// Утверждает, что значение не является логическим.
	it('isNotBoolean', () => {
		assert.isNotBoolean(1);
	});
	// Утверждает, что цель строго (===) равна заданному значению.
	it('.equal, .strictEqual, .deepEqual', () => {1
		expect(1).to.equal(1);
		assert.equal(1, 1);
		assert.equal(1, '1');
		assert.strictEqual(1, 1);
		expect(1).to.not.equal(2);
		assert.notEqual(1, 2);
		assert.notStrictEqual(1, 2);
	});
	// Утверждает, что цель глубоко равна данному объекту.
	it('.eql, .deepEqual', () => {
		expect({a: 1}).to.deep.equal({a: 1});
		expect([1, 2]).to.deep.equal([1, 2]);
		expect({a: 1}).to.eql({a: 1}).but.not.equal({a: 1});
		expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
		assert.deepEqual({a: 1}, {a: 1});
		assert.deepEqual([1, 2], [1, 2]);
		expect({ tea: 'green' }).to.deep.not.equal({ tea: 'jasmine' });
		assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' })
	});
	// Утверждает, что целью является число или дата, большие, чем заданное число или дата n соответственно.
	it('.above, .isAbove', () => {
		expect(2).to.be.above(1);
		assert.isAbove(2, 1);
		expect('foo').to.have.lengthOf.above(2);
		assert.isAbove('foo'.length, 2);
		expect([1, 2, 3]).to.have.lengthOf.above(2);
		assert.isAbove([1, 2, 3].length, 2);
	});
	// Утверждает, что целью является число или дата, большие или равные заданному числу или дате n соответственно.
	it('.least, .isAtLeast', () => {
		expect(2).to.be.at.least(1);
		expect(2).to.be.at.least(2);
		expect(2).to.be.least(1);
		expect(2).to.be.least(2);
		assert.isAtLeast(2, 1);
		assert.isAtLeast(2, 2);
		expect('foo').to.have.lengthOf.least(2);
		expect('foo').to.have.lengthOf.least(3);
		expect([1, 2, 3]).to.have.lengthOf.least(2);
		expect([1, 2, 3]).to.have.lengthOf.least(3);
	});
	// Утверждает, что целью является число или дата, меньшие заданного числа или даты n соответственно.
	it('.below, .isBelow', () => {
		expect(2).to.be.at.below(3);
		expect(2).to.be.below(3);
		assert.isBelow(2, 3);
		expect('foo').to.have.lengthOf.below(4);
		expect([1, 2, 3]).to.have.lengthOf.below(4);
	});
	// Утверждает, что целью является число или дата, меньшая или равная заданному числу или дате n соответственно.
	it('.most, .isAtMost', () => {
		expect(2).to.be.at.most(3);
		expect(2).to.be.at.most(2);
		expect(2).to.be.most(3);
		expect(2).to.be.most(2);
		assert.isAtMost(2, 3);
		assert.isAtMost(2, 2);
		expect('foo').to.have.lengthOf.most(4);
		expect('foo').to.have.lengthOf.most(3);
		expect([1, 2, 3]).to.have.lengthOf.most(4);
		expect([1, 2, 3]).to.have.lengthOf.most(3);
	});
	// Диапазон. Утверждает, что цель представляет собой число или дату, большую или равную заданному числу или дате начала и меньшую или равную заданному числу или дате окончания соответственно.
	it('.within', () => {
		expect(2).to.equal(2);
		expect(2).to.be.within(1, 3);
		expect(2).to.be.within(2, 3);
		expect(2).to.be.within(1, 2);
		expect('foo').to.have.lengthOf.within(2, 4);
		expect([1, 2, 3]).to.have.lengthOf.within(2, 4);
	});
	// Утверждает, что цель является экземпляром данного конструктора
	it('.instanceof', () => {
		function Cat () { }
		expect(new Cat()).to.be.an.instanceof(Cat);
		assert.instanceOf(new Cat, Cat);
		expect([1, 2]).to.be.an.instanceof(Array);
		assert.instanceOf([1, 2], Array);
		expect({a: 1}).to.not.be.an.instanceof(Array);
		assert.notInstanceOf({a: 1}, Array);
	});
	// Утверждает, что цель имеет свойство с заданным именем ключа.
	it('.property', () => {
		expect({a: 1}).to.have.property('a');
		assert.property({a: 1}, 'a')
		expect({a: 1}).to.have.property('a', 1);
		assert.propertyVal({a: 1}, 'a', 1);
		expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
		assert.deepPropertyVal({x: {a: 1}}, 'x', {a: 1});
		expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
		assert.nestedProperty({a: {b: ['x', 'y']}}, 'a.b[1]')
		expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]', 'y');
		assert.nestedPropertyVal({a: {b: ['x', 'y']}}, 'a.b[1]', 'y')
		expect({a: {b: [{c: 3}]}}).to.have.deep.nested.property('a.b[0]', {c: 3});
		assert.deepNestedPropertyVal({a: {b: [{c: 3}]}}, 'a.b[0]', {c: 3})
		expect({a: 1}).to.have.property('a').that.is.a('number');
	});
	// Утверждает, что цель имеет собственный дескриптор свойства с заданным именем ключа. Перечислимые и неперечислимые свойства включаются в поиск.
	it('.ownPropertyDescriptor', () => {
		expect({a: 1}).to.have.ownPropertyDescriptor('a');
		expect({a: 1}).to.have.ownPropertyDescriptor('a', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: 1,
		});
	});
	// Утверждает, что длина или размер цели равны заданному числу n.
	it('.lengthOf', () => {
		expect([1, 2, 3]).to.have.lengthOf(3);
		assert.lengthOf([1, 2, 3], 3);
		expect('foo').to.have.lengthOf(3);
		assert.lengthOf('foo', 3);
		expect(new Set([1, 2, 3])).to.have.lengthOf(3);
		assert.lengthOf(new Set([1, 2, 3]), 3);
		expect(new Map([['a', 1], ['b', 2], ['c', 3]])).to.have.lengthOf(3);
		assert.lengthOf(new Map([['a', 1], ['b', 2], ['c', 3]]), 3);
	});
	// Утверждает, что цель соответствует заданному регулярному выражению re.
	it('.match', () => {
		expect('foobar').to.match(/^foo/);
		assert.match('foobar', /^foo/);
		expect('foobar').to.not.match(/taco/);
		assert.notMatch('foobar', /taco/);
	});
	// Утверждает, что целевая строка содержит заданную подстроку str.
	it('.string', () => {
		expect('foobar').to.have.string('bar');
		expect('foobar').to.not.have.string('taco');
	});
	// Утверждает, что целевой объект, массив, карта или набор имеют заданные ключи. В поиск включаются только собственные унаследованные свойства цели.
	it('.keys', () => {
		expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
		expect(['x', 'y']).to.have.all.keys(0, 1);
		expect({a: 1, b: 2}).to.have.all.keys(['a', 'b']);
		expect(['x', 'y']).to.have.all.keys([0, 1]);
		expect({a: 1, b: 2}).to.have.all.keys({a: 4, b: 5}); // ignore 4 and 5
		expect(['x', 'y']).to.have.all.keys({0: 4, 1: 5}); // ignore 4 and 5
		expect(new Map([['a', 1], ['b', 2]])).to.have.all.keys('a', 'b');
		expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b');
		expect({a: 1, b: 2}).to.be.an('object').that.has.all.keys('a', 'b');
	});
	// Когда аргументы не указаны, .throw вызывает целевую функцию и утверждает, что возникла ошибка.
	it('.throw', () => {
		let badFn = function () { throw new Error('Illegal salmon!'); };
		expect(badFn).to.throw();
		assert.throws(badFn,'Illegal salmon!');
		badFn = function () { throw new TypeError('Illegal salmon!'); };
		expect(badFn).to.throw(TypeError);
		assert.throws(badFn, TypeError, 'Illegal salmon!');
	});
	// Когда цель не является функциональным объектом, .respondTo утверждает, что у цели есть метод с данным методом имени. Метод может быть собственным или унаследованным, и он может быть перечисляемым или неперечисляемым.
	it('.respondTo', () => {
		function O() {
			this.f1 = function () {};
		}
		O.prototype.f2 = function () {};
		O.f3 = function() {}

		expect(new O()).to.respondTo('f2').to.respondTo('f1');
		expect(O).to.respondTo('f2').itself.to.respondTo('f3');
	});
	// Заставляет все утверждения .respondTo, которые следуют в цепочке, вести себя так, как будто цель не является функциональным объектом, даже если это функция. Таким образом, это заставляет .respondTo утверждать, что у цели есть метод с заданным именем, а не утверждать, что у свойства-прототипа цели есть метод с данным именем.
	it('.itself', () => {
		function O() {}
		O.prototype.f1 = function () {};
		O.f2 = function () {};
		expect(O).itself.to.respondTo('f2').but.not.respondTo('f1');
	});
	// Заставляет все утверждения .respondTo, которые следуют в цепочке, вести себя так, как будто цель не является функциональным объектом, даже если это функция. Таким образом, это заставляет .respondTo утверждать, что у цели есть метод с заданным именем, а не утверждать, что у свойства-прототипа цели есть метод с данным именем.
	it('.satisfy', () => {
		expect(1).to.satisfy(function(num) {
			return num > 0;
		});
		expect(1).to.not.satisfy(function(num) {
			return num > 2;
		});
	});
	// Утверждает, что целью является число, которое находится в заданном диапазоне +/- дельта от заданного ожидаемого числа. Однако часто лучше утверждать, что целевое значение равно его ожидаемому значению.
	it('.closeTo', () => {
		expect(1.5).to.be.closeTo(1, 0.5);
		assert.closeTo(1.5, 1, 0.5);
		expect(1.5).to.be.closeTo(2, 0.5);
		assert.closeTo(1.5, 2, 0.5);
		expect(1.5).to.be.closeTo(1, 1);
		assert.closeTo(1.5, 1, 1);
		expect(1.5).to.be.closeTo(1, 3);
		assert.closeTo(1.5, 1, 3);
		expect(1.5).to.not.be.closeTo(1, 0.4);
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
	// Утверждает, что цель является членом данного списка массивов.
	it('.oneOf', () => {
		expect(1).to.be.oneOf([1, 2, 3]);
		assert.oneOf(1, [1, 2, 3])
		expect('Today is sunny').to.contain.oneOf(['sunny', 'cloudy']);
		expect([1,2,3]).to.contain.oneOf([3,4,5]);
	});
	// Когда предоставляется один аргумент, .change утверждает, что данный субъект функции возвращает другое значение, когда он вызывается до целевой функции, по сравнению с тем, когда он вызывается позже.
	it('.change', () => {
		let dots = '';
		let addDot = function () { dots += '.'; };
		let getDots = function () { return dots; };
		// Recommended
		expect(getDots()).to.equal('');
		addDot();
		expect(getDots()).to.equal('.');
		// Not recommended
		dots = '';
		expect(addDot).to.change(getDots);

		let myObj = {dots: ''};
		let addDotObj = function () { myObj.dots += '.'; };
		// Recommended
		expect(myObj).to.have.property('dots', '');
		addDotObj();
		expect(myObj).to.have.property('dots', '.');
		// Not recommended
		myObj.dots = '';
		expect(addDotObj).to.change(myObj, 'dots');
		myObj.dots = '';
		assert.changes(addDotObj, myObj, 'dots');
	});
	// Когда предоставляется один аргумент, .increase утверждает, что данный субъект функции возвращает большее число, когда он вызывается после вызова целевой функции, по сравнению с тем, когда он вызывается до этого. .increase также заставляет все утверждения .by, которые следуют в цепочке, утверждать, насколько большее число возвращается. Часто лучше утверждать, что возвращаемое значение увеличилось на ожидаемую сумму, а не утверждать, что оно увеличилось на какую-либо величину.
	it('.increase, increaseBy', () => {
		let myObj = {val: 1}
		let subtractTwoObj = function () { myObj.val += 2; };
		expect(subtractTwoObj).to.increase(myObj, 'val').by(2);
		myObj.val = 1;
		assert.increasesBy(subtractTwoObj, myObj, 'val', 2);
		myObj.val = 1;
		expect(subtractTwoObj).to.increase(myObj, 'val');
		myObj.val = 1;
		assert.increases(subtractTwoObj, myObj, 'val');
	});
	// Когда предоставляется один аргумент, .decrease утверждает, что данный субъект функции возвращает меньшее число, когда он вызывается после вызова целевой функции, по сравнению с тем, когда он вызывается заранее. .decrease также заставляет все утверждения .by, следующие в цепочке, утверждать, насколько меньшее число возвращается. Часто лучше утверждать, что возвращаемое значение уменьшилось на ожидаемую величину, а не утверждать, что оно уменьшилось на какую-либо величину.
	it('.decrease, .decreasesBy', () => {
		let myObj = {val: 1}
		let subtractTwoObj = function () { myObj.val -= 2; };
		expect(subtractTwoObj).to.decrease(myObj, 'val').by(2);
		myObj.val = 1;
		assert.decreasesBy(subtractTwoObj, myObj, 'val', 2);
		myObj.val = 1;
		expect(subtractTwoObj).to.decrease(myObj, 'val');
		myObj.val = 1;
		assert.decreases(subtractTwoObj, myObj, 'val');
	});
	// Следуя утверждению .increase в цепочке, .by утверждает, что субъект утверждения .increase увеличился на заданную дельту.
	it('.by', () => {
		let myObj = {val: 1};
		let addTwo = function () { myObj.val += 2; };

		expect(addTwo).to.increase(myObj, 'val').by(2);
	});
	// Утверждает, что цель является расширяемой, что означает, что к ней можно добавлять новые свойства. Примитивы никогда не расширяемы.
	it('.extensible', () => {
		expect({a: 1}).to.be.extensible;
		assert.isExtensible({a: 1});

		let nonExtensibleObject = Object.preventExtensions({});
		let sealedObject = Object.seal({});
		let frozenObject = Object.freeze({});

		expect(nonExtensibleObject).to.not.be.extensible;
		assert.isNotExtensible(nonExtensibleObject);
		expect(sealedObject).to.not.be.extensible;
		assert.isNotExtensible(sealedObject);
		expect(frozenObject).to.not.be.extensible;
		assert.isNotExtensible(frozenObject);
		expect(1).to.not.be.extensible;
		assert.isNotExtensible(1);
	});
	// Утверждает, что цель запечатана, что означает, что к ней нельзя добавить новые свойства, а ее существующие свойства нельзя перенастроить или удалить. Однако возможно, что его существующие свойства все еще могут быть переназначены другим значениям. Примитивы всегда запечатаны.
	it('.sealed', () => {
		let sealedObject = Object.seal({});
		let frozenObject = Object.freeze({});

		expect(sealedObject).to.be.sealed;
		assert.isSealed(sealedObject);
		expect(frozenObject).to.be.sealed;
		assert.isSealed(frozenObject);
		expect(1).to.be.sealed;
		assert.isSealed(1);

		expect({a: 1}).to.not.be.sealed;
		assert.isNotSealed({a: 1});
	});
	// Утверждает, что цель заморожена, что означает, что к ней нельзя добавить новые свойства, а ее существующие свойства нельзя переназначить другим значениям, перенастроить или удалить. Примитивы всегда заморожены.
	it('.frozen', () => {
		let frozenObject = Object.freeze({});

		expect(frozenObject).to.be.frozen;
		assert.isFrozen(frozenObject);
		expect(1).to.be.frozen;
		assert.isFrozen(1);

		expect({a: 1}).to.not.be.frozen;
		assert.isNotFrozen({a: 1});
	});
	// Утверждает, что значение является конечным числом. В отличие от .isNumber, это не удастся для NaN и Infinity.
	it('.finite, isFinite', () => {
		expect(1).to.be.finite;
		assert.isFinite(1);
	});
	// Утверждает, если значение не является ложным значением, и выдает, если оно является истинным значением. Это добавлено, чтобы chai мог заменить класс assert узла
	it('ifError', () => {
		try {
			var err = new Error('I am a custom error');
		} catch (err) {
			assert.ifError(err);
		}
	});
	// Утверждает, что целью является число, а не NaN или положительная/отрицательная бесконечность.
	it('.fail', () => {
		expect.fail();
		expect.fail("custom error message");
		expect.fail(1, 2);
		expect.fail(1, 2, "custom error message");
		expect.fail(1, 2, "custom error message", ">");
		expect.fail(1, 2, undefined, ">");

		assert.fail();
		assert.fail("custom error message");
		assert.fail(1, 2);
		assert.fail(1, 2, "custom error message");
		assert.fail(1, 2, "custom error message", ">");
		assert.fail(1, 2, undefined, ">");
	});
});