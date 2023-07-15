import React from 'react';
import './Content.scss';

function Content(props) {
	return (
		<>
			<h2>{props.category.title}</h2>
			{props.category.content.map(item => {
				return (
					<section key={item.key}>
						<h3><a id={'fn-' + item.name}></a>{'_.' + item.name}</h3>
						<p>{item.description}</p>

						<h4>Lodash</h4>
						<pre><code className="language-js">
							{item.lodash ? item.lodash : `\nНет реализации.\n\n`}
						</code></pre>

						<h4>Underscore</h4>
						<pre><code className="language-js">
							{item.underscore ? item.underscore : `\nНет реализации.\n\n`}
						</code></pre>

						<h4>Vanilla JavaScript</h4>
						<pre><code className="language-js">
							{item.vanillaJavaScript}
						</code></pre>
					</section>
				);
			})}
		</>
	);
}

export default Content;