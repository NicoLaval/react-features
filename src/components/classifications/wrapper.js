import React from 'react';
import FetchErrorBoundary from 'components/errors/fetch';
import Classifications from './component';
import { Suspense } from 'react';

const Wrapper = () => (
	<>
		<h1>Liste des nomenclatures</h1>
		<FetchErrorBoundary>
			<Suspense fallback={<div>Loading from suspense...</div>}>
				<Classifications />
			</Suspense>
		</FetchErrorBoundary>
	</>
);

export default Wrapper;
