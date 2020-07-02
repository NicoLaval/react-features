import React, { createContext, useReducer } from 'react';

const CounterContext = createContext();

const initialState = {
	counter: {},
};

const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case '?':
			return {};
		default:
			return { ...state, counter: payload };
	}
};

const CounterContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	return (
		<CounterContext.Provider value={value}>{children}</CounterContext.Provider>
	);
};

const CounterContextConsumer = CounterContext.Consumer;

export { CounterContext, CounterContextProvider, CounterContextConsumer };
