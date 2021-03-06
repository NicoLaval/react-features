import { useState, useEffect } from 'react';

export const useFetch = (getter, params) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const setError = useState(null)[1];

	useEffect(() => {
		getter(params)
			.then(c => {
				setData(c);
			})
			.then(() => {
				setLoading(false);
			})
			.catch(err => {
				setError(() => {
					throw err;
				});
			});
	}, [getter, params, setError]);

	return { data, loading };
};
