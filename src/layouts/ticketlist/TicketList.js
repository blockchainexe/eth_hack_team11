
import TicketCard from '../components/TicketCard';
import React, {
    Component
} from 'react'
import web3 from '../web3'
import TicketFactoryContract from '../../deploy/contract_factory'
import abi from '../../deploy/contract_ticket'

// etherum
import web3 from "../web3";
import TicketFactoryContract from "../../deploy/contract_factory";
import abi from "../../deploy/contract_ticket";

import firebase from 'firebase';

class TicketList extends Component {
    constructor(props, { authData }) {
        super(props);

        authData = this.props
        this.state = {}
    }

    onPriceChange = async (e) => {
        e.preventEvent()
        let price = e.target.value
        this.setState({price})

    }

    // QR codeを読んだ時発火
    withdrawByManager = async () => {
        let account = this.state.account
        let id = this.state.id
        let TicketContracts = this.state.contracts
        let TicketContract = TicketContracts[id]
        // get hash from QR code
        let uid;
        let buyer;
        TicketContract.methods.withdraw(uid, buyer).send({
            from: account,
            gas: 4700000
        }).then(async () => {
            console.log("happen: withdraw")
        })
    }

    createTicketContract = async () => {

        let price = 0.1
        let stringPrice = String(price)
        let account = this.state.account
        TicketFactoryContract.methods.createTicket(web3.utils.toWei(stringPrice, 'ether')).send({

            from: account,
            gas: 4700000
        }).then(async () => {
            //firebase で情報を保存する。
            console.log("happen: createTicket")
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
        TicketContract.methods.join(day, number).send({
            from: account,
            value: value,
            gas: 4700000
        }).then(async () => {
            console.log("happen: getSummary")
        })
    }

    async componentWillMount() {
        const addresses = await TicketFactoryContract.methods.getDeployedTickets().call()
        const accounts = await web3.eth.getAccounts()
        const account = accounts[0]
        let contracts = []
        console.log(
            addresses
        )
        if (addresses.length !== 0) {
            await addresses.map(async (address) => {
                let contract = await new web3.eth.Contract(abi, address)
                // let uid_test = await contract.methods.requests[0].call()
                console.log(contract.methods)
                console.log({
                    contract
                })
                contracts.push(contract)
            })
            this.setState({
                contracts,
            })
        }
        this.setState({

            account,
        })
        console.log(this.state)

        this.dataRef = firebase.database().ref('tickets/');


    }

    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <p><strong>User: {this.props.authData.name}</strong></p>
                        <ul style={listStyle}>
                            {
                                [...Array(8).keys()].map(i => {

                                    return <TicketCard key={i} id={i} />

                                })
                            }
                        </ul>
                    </div>
                </div>
            <input
                type="button"
                onClick={this.createTicketContract}
                value="create"
            />
            </main>
        )
    }
}

export default TicketList

const listStyle = {
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    marginTop: 80,
    width: 1400,
    justifyContent: "space-between",

}

