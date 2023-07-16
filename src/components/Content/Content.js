import React from 'react';
import './Content.scss';

function Content(props) {
	return (
		<>
			<h2>{props.category.title}</h2>
			{props.category.content.map(item => {
				return (
					<section key={item.key}>
						<h3><a id={'fn-' + item.name}></a>{item.name}</h3>
						<p>{item.description}</p>

						<h4>Chai expect</h4>
						<pre><code className="language-js">
							{item.expectChai ? item.expectChai : `\nНет реализации.\n\n`}
						</code></pre>

						<h4>Chai assert</h4>
						<pre><code className="language-js">
							{item.assertChai ? item.assertChai : `\nНет реализации.\n\n`}
						</code></pre>

						<h4>Jest</h4>
						<pre><code className="language-js">
							{item.jest}
						</code></pre>
					</section>
				);
			})}
		</>
	);
}

export default Content;