import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CounterContext } from 'contexts/count-context';
import { getClassifications } from 'api';
import { getCounterText } from 'utils/counter';
import { useFetch } from 'utils/fetch-hook';

const Classifications = () => {
	const { data: classifications, loading, error } = useFetch(
		getClassifications
	);

	const {
		state: { counter },
	} = useContext(CounterContext);

	if (error) return <div>Error</div>;
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
