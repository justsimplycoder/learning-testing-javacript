const {expect, assert} = require('chai');

// it.only - пропускает тест
// it.skip - не запускает тест, в ожидании
describe('Тесты', () => {
	// Отменяет все утверждения, которые следуют в цепочке.
	it('.not', () => {
		expect(() => {}).to.not.throw();
		expect({a: 1}).to.not.have.property('b');
		expect(1).to.not.equal(2);
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
	});
	// ЗЗаставляет все утверждения .keys, которые следуют в цепочке, требовать, чтобы у цели были все заданные ключи. Это противоположно .any, который требует только, чтобы у цели был хотя бы один из заданных ключей.
	it('.all', () => {
		expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
	});
	// Утверждает, что целевой тип равен заданному строковому типу. Типы нечувствительны к регистру.
	it('.a', () => {
		expect('foo').to.be.a('string');
		expect({a: 1}).to.be.an('object');
		expect({a: 1}).to.be.a('object');
		expect([1, 2, 3]).to.be.a('array');
		expect(null).to.be.a('null');
		expect(undefined).to.be.an('undefined');
		expect(new Error).to.be.an('error');
		expect(Promise.resolve()).to.be.a('promise');
		expect(new Float32Array).to.be.a('float32array');
		expect(Symbol()).to.be.a('symbol');
		var myObj = {
			[Symbol.toStringTag]: 'myCustomType'
		};
		expect(myObj).to.be.a('myCustomType').but.not.an('object');
	});
	// Когда целью является строка, .include утверждает, что данная строка val является подстрокой цели.
	it('.include', () => {
		expect('foobar').to.include('bar');
		expect([1, 2, 3]).to.include(2);
		expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
		expect(new Set([1, 2])).to.include(1);
		expect(new Map([['a', 1], ['b', 2]])).to.include(1);
		expect([1, 2, 3]).to.be.an('array').that.includes(2);
	});
	// Утверждает, что цель является истинным значением (считается истинным в логическом контексте). Однако часто лучше утверждать, что цель строго (===) или полностью равна ожидаемому значению.
	it('.ok', () => {
		expect(1).to.be.ok;
		expect('sdf').to.be.ok;
		expect({}).to.be.ok;
		expect(0).to.not.be.ok;
		expect(null).to.not.be.ok;
	});
	// Утверждает, что цель строго (===) равна true.
	it('.true', () => {
		expect(true).to.be.true;
		expect(false).to.not.be.true;
	});
	// Утверждает, что цель строго (===) равна false.
	it('.false', () => {
		expect(false).to.be.false;
		expect(true).to.not.be.false;
	});
	// Утверждает, что цель строго (===) равна null.
	it('.null', () => {
		expect(null).to.be.null;
		expect(true).to.not.null;
	});
	// Утверждает, что цель строго (===) равна неопределенной.
	it('.undefined', () => {
		expect(undefined).to.be.undefined;
		expect(true).to.not.be.undefined;
	});
	// Утверждает, что целью является именно NaN.
	it('.NaN', () => {
		expect(NaN).to.be.NaN;
		expect(true).to.not.be.NaN;
	});
	// Утверждает, что цель не является строго (===) равной null или undefined.
	it('.exist', () => {
		expect(true).to.exist;
		expect(undefined).to.not.exist;
		expect(null).to.not.exist;
	});
	// Когда целью является строка или массив, .empty утверждает, что свойство длины цели строго (===) равно 0
	it('.empty', () => {
		expect([]).to.be.empty;
		expect('').to.be.empty;
		expect(new Set()).to.be.empty;
		expect(new Map()).to.be.empty;
		expect({}).to.be.empty;
		expect([]).to.be.an('array').that.is.empty;
	});
	// Утверждает, что целью является объект arguments.
	it('.arguments', () => {
		(function () {
			expect(arguments).to.be.arguments;
		})();
	});
	// Утверждает, что цель строго (===) равна заданному значению.
	it('.equal', () => {1
		expect(1).to.equal(1);
		expect(1).to.not.equal(2);
	});
	// Утверждает, что цель глубоко равна данному объекту.
	it('.eql', () => {
		expect({a: 1}).to.deep.equal({a: 1});
		expect([1, 2]).to.deep.equal([1, 2]);
		expect({a: 1}).to.eql({a: 1}).but.not.equal({a: 1});
		expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
		expect({ tea: 'green' }).to.deep.not.equal({ tea: 'jasmine' });
	});
	// Утверждает, что целью является число или дата, большие, чем заданное число или дата n соответственно.
	it('.above', () => {
		expect(2).to.be.above(1);
		expect('foo').to.have.lengthOf.above(2);
		expect([1, 2, 3]).to.have.lengthOf.above(2);
	});
	// Утверждает, что целью является число или дата, большие или равные заданному числу или дате n соответственно.
	it('.least', () => {
		expect(2).to.be.at.least(1);
		expect(2).to.be.at.least(2);
		expect(2).to.be.least(1);
		expect(2).to.be.least(2);
		expect('foo').to.have.lengthOf.least(2);
		expect('foo').to.have.lengthOf.least(3);
		expect([1, 2, 3]).to.have.lengthOf.least(2);
		expect([1, 2, 3]).to.have.lengthOf.least(3);
	});
	// Утверждает, что целью является число или дата, меньшие заданного числа или даты n соответственно.
	it('.below', () => {
		expect(2).to.be.at.below(3);
		expect(2).to.be.below(3);
		expect('foo').to.have.lengthOf.below(4);
		expect([1, 2, 3]).to.have.lengthOf.below(4);
	});
	// Утверждает, что целью является число или дата, меньшая или равная заданному числу или дате n соответственно.
	it('.most', () => {
		expect(2).to.be.at.most(3);
		expect(2).to.be.at.most(2);
		expect(2).to.be.most(3);
		expect(2).to.be.most(2);
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
		expect([1, 2]).to.be.an.instanceof(Array);
		expect({a: 1}).to.not.be.an.instanceof(Array);
	});
	// Утверждает, что цель имеет свойство с заданным именем ключа.
	it('.property', () => {
		expect({a: 1}).to.have.property('a');
		expect({a: 1}).to.have.property('a', 1);
		expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
		expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
		expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]', 'y');
		expect({a: {b: [{c: 3}]}}).to.have.deep.nested.property('a.b[0]', {c: 3});
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
		expect('foo').to.have.lengthOf(3);
		expect(new Set([1, 2, 3])).to.have.lengthOf(3);
		expect(new Map([['a', 1], ['b', 2], ['c', 3]])).to.have.lengthOf(3);
	});
	// Утверждает, что цель соответствует заданному регулярному выражению re.
	it('.match', () => {
		expect('foobar').to.match(/^foo/);
		expect('foobar').to.not.match(/taco/);
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
		badFn = function () { throw new TypeError('Illegal salmon!'); };
		expect(badFn).to.throw(TypeError);
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
		expect(1.5).to.be.closeTo(2, 0.5);
		expect(1.5).to.be.closeTo(1, 1);
		expect(1.5).to.be.closeTo(1, 3);
		expect(1.5).to.not.be.closeTo(1, 0.4);
	});
	// Утверждает, что целевой массив имеет те же элементы, что и заданный набор массивов.
	it('.members', () => {
		expect([{a: 1}]).to.have.deep.members([{a: 1}]);
		expect([1, 2, 3]).to.have.members([2, 1, 3]);
		expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
		expect([1, 2, 3]).to.include.members([1, 2]);
		expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
		expect([{a: 1}, {b: 2}, {c: 3}]).to.include.deep.ordered.members([{a: 1}, {b: 2}]);
	});
	// Утверждает, что цель является членом данного списка массивов.
	it('.oneOf', () => {
		expect(1).to.be.oneOf([1, 2, 3]);
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
		expect(addDot).to.change(getDots);

		let myObj = {dots: ''};
		let addDotObj = function () { myObj.dots += '.'; };
		// Recommended
		expect(myObj).to.have.property('dots', '');
		addDotObj();
		expect(myObj).to.have.property('dots', '.');
		// Not recommended
		expect(addDotObj).to.change(myObj, 'dots');
	});
	// Когда предоставляется один аргумент, .increase утверждает, что данный субъект функции возвращает большее число, когда он вызывается после вызова целевой функции, по сравнению с тем, когда он вызывается до этого. .increase также заставляет все утверждения .by, которые следуют в цепочке, утверждать, насколько большее число возвращается. Часто лучше утверждать, что возвращаемое значение увеличилось на ожидаемую сумму, а не утверждать, что оно увеличилось на какую-либо величину.
	it('.increase', () => {
		let val = 1;
		let addTwo = function () { val += 2; };
		let getVal = function () { return val; };
		expect(addTwo).to.increase(getVal).by(2); // Recommended
		expect(addTwo).to.increase(getVal); // Not recommended

		let myObj = {val: 1}
		let addTwoObj = function () { myObj.val += 2; };
		expect(addTwoObj).to.increase(myObj, 'val').by(2); // Recommended
		expect(addTwoObj).to.increase(myObj, 'val'); // Not recommended
	});
	// Когда предоставляется один аргумент, .decrease утверждает, что данный субъект функции возвращает меньшее число, когда он вызывается после вызова целевой функции, по сравнению с тем, когда он вызывается заранее. .decrease также заставляет все утверждения .by, следующие в цепочке, утверждать, насколько меньшее число возвращается. Часто лучше утверждать, что возвращаемое значение уменьшилось на ожидаемую величину, а не утверждать, что оно уменьшилось на какую-либо величину.
	it('.decrease', () => {
		let val = 1;
		let subtractTwo = function () { val -= 2; }
		let getVal = function () { return val; };
		expect(subtractTwo).to.decrease(getVal).by(2); // Recommended
		expect(subtractTwo).to.decrease(getVal); // Not recommended

		let myObj = {val: 1}
		let subtractTwoObj = function () { myObj.val -= 2; };
		expect(subtractTwoObj).to.decrease(myObj, 'val').by(2); // Recommended
		expect(subtractTwoObj).to.decrease(myObj, 'val'); // Not recommended
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

		let nonExtensibleObject = Object.preventExtensions({});
		let sealedObject = Object.seal({});
		let frozenObject = Object.freeze({});

		expect(nonExtensibleObject).to.not.be.extensible;
		expect(sealedObject).to.not.be.extensible;
		expect(frozenObject).to.not.be.extensible;
		expect(1).to.not.be.extensible;
	});
	// Утверждает, что цель запечатана, что означает, что к ней нельзя добавить новые свойства, а ее существующие свойства нельзя перенастроить или удалить. Однако возможно, что его существующие свойства все еще могут быть переназначены другим значениям. Примитивы всегда запечатаны.
	it('.sealed', () => {
		let sealedObject = Object.seal({});
		let frozenObject = Object.freeze({});

		expect(sealedObject).to.be.sealed;
		expect(frozenObject).to.be.sealed;
		expect(1).to.be.sealed;

		expect({a: 1}).to.not.be.sealed;
	});
	// Утверждает, что цель заморожена, что означает, что к ней нельзя добавить новые свойства, а ее существующие свойства нельзя переназначить другим значениям, перенастроить или удалить. Примитивы всегда заморожены.
	it('.frozen', () => {
		let frozenObject = Object.freeze({});

		expect(frozenObject).to.be.frozen;
		expect(1).to.be.frozen;

		expect({a: 1}).to.not.be.frozen;
	});
	// Утверждает, что целью является число, а не NaN или положительная/отрицательная бесконечность.
	it('.finite', () => {
		expect(1).to.be.finite;
	});
	// Утверждает, что целью является число, а не NaN или положительная/отрицательная бесконечность.
	it('.fail', () => {
		expect.fail();
		expect.fail("custom error message");
		expect.fail(1, 2);
		expect.fail(1, 2, "custom error message");
		expect.fail(1, 2, "custom error message", ">");
		expect.fail(1, 2, undefined, ">");
	});
});