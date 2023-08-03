const {expect, assert} = require('chai');

// it.only - пропускает тест
// it.skip - не запускает тест, в ожидании
describe('Тесты', () => {
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
	// Утверждает, что целью является объект arguments.
	it('.arguments', () => {
		(function () {
			expect(arguments).to.be.arguments;
		})();
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