import React, {
  Component
} from 'react'
import web3 from '../web3'
import TicketFactoryContract from '../../deploy/contract_factory'
import abi from '../../deploy/contract_ticket'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {}
  }

  async componentWillMount() {
    const addresses = await TicketFactoryContract.methods.getDeployedTickets()
    const accounts = web3.eth.getAccounts()
    const account = accounts[0]
    let contracts = []
    addresses.map( async (address) => {
      let contract = await new web3.eth.contract(abi, address)
      let uid_test = await contract.methods.requests(0).call()
      console.log({ contract, uid_test })
      contracts.push(contract)
    })
    this.setState({
      contracts,
      account,
    })
    console.log(this.state)
  }

  implementRefundFunc = async () => {
    let account = this.state.account
    let id = this.state.id
    let TicketContracts = this.state.contracts
    let TicketContract = TicketContracts[id]
    await TicketContract.methods.getRefund().send({
      from: account,
      gas: 4700000
    }).then(async () => {
      console.log("happen: getRefund")
    })
  }


  render() {
    console.log(this.props.authData)
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with UPort successfully.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
