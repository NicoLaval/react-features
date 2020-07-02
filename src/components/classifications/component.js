import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CounterContext } from 'contexts/count-context';
import { getClassifications } from 'api';
import { getCounterText } from 'utils/counter';

const Classifications = () => {
	const [classifications, setClassifications] = useState([]);
	const [loading, setLoading] = useState(true);

	const {
		state: { counter },
	} = useContext(CounterContext);

	useEffect(() => {
		getClassifications()
			.then(c => {
				setClassifications(c);
			})
			.then(() => {
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading...</div>;

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
