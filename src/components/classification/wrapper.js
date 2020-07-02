import React from 'react';
import Classification from './component';
import { Suspense } from 'react';

const Wrapper = () => (
	<>
		<Suspense fallback={<div>Loading with lazy...</div>}>
			<Classification />
		</Suspense>
	</>
);

export default Wrapper;
