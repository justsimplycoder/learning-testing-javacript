import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.scss';
import listTest from './helpers/listTest.js';

import 'highlight.js/scss/atom-one-dark.scss';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import Toc from './components/Toc/Toc';
import Content from './components/Content/Content'


function App() {
	React.useEffect(() => {
		hljs.highlightAll();
	}, []);

	return (
		<div className="page">
			<header className="page__header header">
				<h1 className="header__title">Тестирование JavaScript: <a href="https://mochajs.org/">Mocha</a> - <a href="https://www.chaijs.com/">Chai</a> - <a href="https://jestjs.io/ru/">Jest</a></h1>
			</header>
			<aside className="page__toc">
				{listTest.map(category => {
					return (
						<Toc category={category} key={category.key} />
					)
				})}
			</aside>
			<main className="page__content content">
				{listTest.map((category, index) => {
					return (
						<Content category={category} key={category.key} />
					)
				})}
			</main>
		</div>
	);
}

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(<App />);


