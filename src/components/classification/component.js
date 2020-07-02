import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CounterContext } from 'contexts/count-context';
import { getClassification } from 'api';
import { getCounterText } from 'utils/counter';
import { useFetch } from 'utils/fetch-hook';

const Classification = () => {
	const { code } = useParams();
	const { data: classification, loading, error } = useFetch(
		getClassification,
		code
	);

	const {
		state: { counter },
		dispatch,
	} = useContext(CounterContext);

	if (error) return <div>Error...</div>;
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
