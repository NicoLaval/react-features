import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { CounterContextProvider } from 'contexts/count-context';
import Classifications from 'components/classifications';
import Classification from 'components/classification';
import FetchErrorBoundary from './errors/fetch';

const Root = () => (
	<div className="container">
		<CounterContextProvider>
			<Router>
				<Switch>
					<Route path="/classifications" component={Classifications} />
					<Route path="/classification/:code" component={Classification} />
					<Redirect to="/classifications" />
				</Switch>
			</Router>
		</CounterContextProvider>
	</div>
);

export default Root;
