import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Classifications from 'components/classifications';
import Classification from 'components/classification';
import { RecoilRoot } from 'recoil';

const Root = () => (
	<div className="container">
		<RecoilRoot>
			<Router>
				<Switch>
					<Route path="/classifications" component={Classifications} />
					<Route path="/classification/:code" component={Classification} />
					<Redirect to="/classifications" />
				</Switch>
			</Router>
		</RecoilRoot>
	</div>
);

export default Root;
