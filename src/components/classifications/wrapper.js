import React from 'react';
import FetchErrorBoundary from 'components/errors/fetch';
import Classifications from './component';

const Wrapper = () => (
	<>
		<h1>Liste des nomenclatures</h1>
		<FetchErrorBoundary>
			<Classifications />
		</FetchErrorBoundary>
	</>
);

export default Wrapper;
