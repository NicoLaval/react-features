import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CounterContext } from 'contexts/count-context';
import { getClassification } from 'api';
import buildExtract from 'utils/build-extract';
import { getCounterText } from 'utils/counter';

const Classification = props => {
	const [classification, setClassification] = useState({});
	const [loading, setLoading] = useState(true);

	const code = buildExtract('code')(props);

	const {
		state: { counter },
		dispatch,
	} = useContext(CounterContext);

	useEffect(() => {
		getClassification(code)
			.then(c => {
				setClassification(c);
			})
			.then(() => {
				setLoading(false);
			});
	}, [code]);

	if (loading) return <div>Loading...</div>;

	const {
		label,
		description,
		previousId,
		previousLabel,
		nextId,
		nextLabel,
	} = classification;

	if (!label) return null;

	const count = counter[code];

	return (
		<div>
			<h1 className="centered">{label}</h1>
			<label htmlFor={`plus-${code}`}>
				<button
					type="button"
					name={`plus-${code}`}
					onClick={() => {
						dispatch({
							payload: { ...counter, [code]: count ? count + 1 : 1 },
						});
					}}
				>
					Like
				</button>
				{`  ${getCounterText(count)}`}
			</label>
			<h4>
				<i>{description}</i>
			</h4>
			{previousId && (
				<div>
					<h4>Nomenclature précédente :</h4>
					<Link to={`/classification/${previousId}`}>{previousLabel}</Link>
				</div>
			)}
			{nextId && (
				<div>
					<h4>Nomenclature suivante :</h4>
					<Link to={`/classification/${nextId}`}>{nextLabel}</Link>
				</div>
			)}
			<div className="centered">
				<Link to="/classifications">Accueil</Link>
			</div>
		</div>
	);
};

export default Classification;
