import React, { Component } from 'react'
import web3 from './web3'
import TicketFactoryContract from './deploy/contract_factory'
import abiTicket from './deploy/contract_ticket'
import TicketContract from './deploy/contract_ticket'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: "",
      day: "",
      number: "",
      contracts: [],

      price: "",
    }
  }

  createTicketContract = () => {
    let price = this.state.price
    let deploy = TicketFactoryContract.methods.createTicket(price)
  }

  implementJoinFunc = () => {
    let day = this.state.day
    let number = this.state.number
    let id = this.state.id
    let TicketContracts = this.state.contracts
    let TicketContract = TicketContracts[id]
    let value = await TicketContract.methods.getSummary().ticketPrice
    let join = TicketFactoryContract.methods.join(day, number).send({
      from: account,
      value: value,

    })
  }

  implementRefundFunc = () => {
    let account = this.state.accout
  }

  withdrawByManager = () => {
    let account = this.state.account
    let id = this.state.id    let TicketContracts = this.state.contracts
    let TicketContract = TicketContracts[id]
    let withdraw = TicketContract.methods.withdraw()
  }

  async conponentWillMount() {
    let addresses = await TicketFactoryContract.methods.getDeployedTickets()
    let contracts = [];
    let makeContracts= await addresses.map((address) => {
      let contract = new web3.eth.contract(abiTicket, address[i])
      contracts.push(contract)
    })
    this.setState({ contracts })
  }

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
        <nav className="navbar pure-menu pure-menu-horizontal">
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
