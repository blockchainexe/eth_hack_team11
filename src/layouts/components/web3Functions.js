import React, {
  Component
} from 'react'
import web3 from './web3'
import TicketFactoryContract from '../../deploy/contract_factory'
import abi from '../..//deploy/contract_ticket'

class web3Functions extends Component {

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

  createTicketContract = async () => {
    let price = this.state.price
    let account = this.state.account
    let ticket
    await TicketFactoryContract.methods.createTicket(price).send({
      from: account,
      gas: 4700000
    }).then( async () =>{
      //firebase で情報を保存する。
    })
  }

  implementJoinFunc = async () => {
    let account = this.state.account
    let day = this.state.day
    let number = this.state.number
    let id = this.state.id
    let TicketContracts = this.state.contracts
    let TicketContract = TicketContracts[id]
    let value = await TicketContract.methods.getSummary().ticketPrice
    await TicketContract.methods.join(day, number).send({
      from: account,
      value: value,
      gas: 4700000
    })
  }

  implementRefundFunc = async () => {
    let account = this.state.account
    let id = this.state.id
    let TicketContracts = this.state.contracts
    let TicketContract = TicketContracts[id]
    await TicketContract.methods.getRefund().send({
      from: account,
      gas: 4700000
    })
  }

  withdrawByManager = async () => {
    let account = this.state.account
    let id = this.state.id
    let TicketContracts = this.state.contracts
    let TicketContract = TicketContracts[id]
    await TicketContract.methods.withdraw().send({
      from: account,
      gas: 4700000
    })
  }

  async conponentWillMount() {
    const addresses = TicketFactoryContract.methods.getDeployedTickets()
    const owner = TicketFactoryContract.methods.owner().call()
    const accounts =  web3.eth.getAccounts()
    const account = accounts[0]
    let contracts = []
    await addresses.map((address) => {
      let contract = new web3.eth.contract(abi, address)
      contracts.push(contract)
    })
    this.setState({
      contracts,
      owner,
      account,
    })
    console.log(this.state)
  }
}

export default web3Functions
