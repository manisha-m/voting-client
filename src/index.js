import React from 'react';
import ReactDOM from 'react-dom';
import {VotingContainer} from './components/Voting';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import {ResultsContainer} from './components/Results';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {setState} from './action_creators';
import io from 'socket.io-client';
import remoteActionMiddleware from './remote_action_middleware';

//apply logger middleware
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const logger = createLogger();
const isProduction = process.env.NODE_ENV === 'production';
const protocol =  isProduction ? "https:" : location.protocol;
const serverName = isProduction ? "mmalla-voting-server.herokuapp.com" : location.hostname;

const url = protocol + '//' + serverName + ':8090';
console.log(url);
const socket = io(url);
socket.on('state', state => 
	store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket), thunk, promise, logger
)(createStore);
const store = createStoreWithMiddleware(reducer);


const routes = 
        <Route component={App}>
            <Route path='/results' component={ResultsContainer}/>
            <Route path='/' component={VotingContainer}/>
        </Route>;

ReactDOM.render(
	<Provider store={store}>
    	<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
);
