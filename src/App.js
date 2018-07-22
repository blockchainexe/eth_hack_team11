import React, { Component } from 'react'

import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import { FirestoreProvider } from 'react-firestore';


// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/tickets" className="pure-menu-link">Tickets</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <LogoutButtonContainer />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <LoginButtonContainer />
      </span>
    )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal" style={{zIndex:100}}>
          <Link to="/" className="pure-menu-heading pure-menu-link">God payment</Link>
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
