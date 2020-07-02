import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getClassifications } from 'api';
import { getCounterText } from 'utils/counter';
import { cache } from 'utils/cache';
import { counterState } from 'state/counter';

const Classifications = () => {
	const [counter] = useRecoilState(counterState);

	const classifications = getClassifications.read(cache);

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
