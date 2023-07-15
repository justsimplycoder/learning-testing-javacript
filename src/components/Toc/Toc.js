import React from 'react';
import './Toc.scss';

/**
 * Изменение url без перезагрузки и добавление истории перехода по функциям
 * @param {string} curLoc - название функции
 */
function setLocation(curLoc){
	try {
		history.pushState({name: curLoc}, '_.' + curLoc, '#fn-' + curLoc);
		return;
	} catch(e) {}
	location.hash = '#' + curLoc;
}

function Toc(props) {
	function handleMoveFunction(name, e) {
		e.preventDefault();
		const scrollTarget = document.getElementById('fn-' + name);
		const topOffset = 92;
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;
		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		});
		setLocation(name);
	}

	return (
		<>
			<p>{props.category.title}</p>
			<ul className="toc">
				{props.category.content.map(item => {
					return (
						<li className="toc__item" key={item.key}>
							<a className="toc__link" href={'#' + item.name} onClick={(e) => {handleMoveFunction(item.name, e)}}>{'_.' + item.name}</a>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default Toc;