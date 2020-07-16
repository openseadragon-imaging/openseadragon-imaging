import React from 'react';
import PropTypes from 'prop-types';
import './ConsoleList.scss';

ConsoleList.propTypes = {
	consoleRows: PropTypes.arrayOf(
		PropTypes.shape({
			msg: PropTypes.string,
			itemClass: PropTypes.string
		})
	)
};

function ConsoleList(props) {
	const { consoleRows } = props;

	return (
		<ul className="console-list" id="console-list">
			{consoleRows.map((item, index) => (
				<li key={index.toString()} className={item.itemClass}>
					<span>{item.msg}</span>
				</li>
			))}
		</ul>
	);
}

export default ConsoleList;
