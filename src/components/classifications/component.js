import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CounterContext } from 'contexts/count-context';
import { getClassifications } from 'api';
import { getCounterText } from 'utils/counter';
import { cache } from 'utils/cache';

const Classifications = () => {
	const classifications = getClassifications.read(cache);

	const {
		state: { counter },
	} = useContext(CounterContext);

	return (
		<div>
			<h1 className="centered">Classifications</h1>
			<ul>
				{classifications.map(({ code, intitule }) => (
					<li key={code}>
						<Link to={`/classification/${code}`}>
							{`${intitule} (${getCounterText(counter[code])})`}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Classifications;
