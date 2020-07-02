import React, { Suspense, lazy } from 'react';
const JSONEditor = lazy(() => import('./json-editor.component'));

const AsyncEditor = props => (
	<Suspense fallback={<div>Loading editor...</div>}>
		<JSONEditor {...props} />
	</Suspense>
);

export default AsyncEditor;
