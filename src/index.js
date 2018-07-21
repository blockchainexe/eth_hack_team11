import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'
import firebase from 'firebase';

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import TicketList from "./layouts/ticketlist/TicketList"
import Detail from "./layouts/ticketdetail/Detail"
import Profile from './user/layouts/profile/Profile'


// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCuk9qkue7xzNoO0cFdJ8CoiTIwMxufDhM",
  authDomain: "godpay-f1032.firebaseapp.com",
  databaseURL: "https://godpay-f1032.firebaseio.com",
  projectId: "godpay-f1032",
  storageBucket: "godpay-f1032.appspot.com",
  messagingSenderId: "1068715886133"
};
firebase.initializeApp(config);

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="tickets" component={UserIsAuthenticated(TicketList)} />
          <Route path="detail/:ticketid" component={UserIsAuthenticated(Detail)} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
),
  document.getElementById('root')
)
