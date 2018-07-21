import React, { Component } from 'react'
import { Card, CardMedia } from "material-ui/Card";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import createKeccakHash from "keccak";
import Mnemonic from "bitcore-mnemonic"
// ここの画像は仮です
import Sensouji from "../../img/sensouji.jpg"

// ethereum
import web3 from "../web3";
import TicketFactoryContract from "../../deploy/contract_factory";
import abi from "../../deploy/contract_ticket";

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toDate: moment(),
            number: 1
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeDate(date) {
        console.log(date)
        this.setState({
            toDate: date
        });
    }

    handleChangeNumber(e) {
        e.preventDefault();
        this.setState({
            number: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        // daysを計算
        const fromDate = moment();
        const toDate = this.state.toDate;
        const days = toDate.diff(fromDate, "days") + 1;
        // uidKey
        var code = new Mnemonic(Mnemonic.Words.ENGLISH).phrase;
        const uidKey = createKeccakHash('keccak256').update(code).digest('hex')
        // num
        const num = this.state.number;

        

        // Solidity処理は未実装
        /*
        async () => {
            let account = this.state.account
            let id = this.state.id
            let TicketContracts = this.state.contracts
            let TicketContract = TicketContracts[id]
            let value = await TicketContract.methods.getSummary().ticketPrice
            TicketContract.methods.join(days, num, uidKey).send({
                from: account,
                value: value,
                gas: 4700000
            }).then(async () => {
                console.log("happen: getSummary")
            })
        }
        */

        // 渡すのはmnimonicなのかそれともkecchackしたmnimonicなのか
        //DBに入れる処理
        // qrコードページに飛ぶ
    }

    async componentWillMount() {
        const addresses = await TicketFactoryContract.methods.getDeployedTickets().call()
        const accounts = web3.eth.getAccounts()
        const account = accounts[0]
        let contracts = []
        console.log({
            addresses
        })
        if (addresses.length !== 0) {
            addresses.map(async (address) => {
                let contract = await new web3.eth.contract(abi, address)
                let uid_test = await contract.methods.requests(0).call()
                console.log({
                    contract,
                    uid_test
                })
                contracts.push(contract)
            })
        }
        this.setState({
            contracts,
            account,
        })
        console.log(this.state)
    }

    render() {
        console.log("detail componentのstate⬇️");
        console.log(this.state)
        return (
            <main className="container" style={backgroundStyle} >
                <div className="pure-g" >
                    <div className="pure-u-1-1">
                        <div style={containerStyle}>
                            <section style={leftStyle}>
                                <Card style={cardStyle}>
                                    <CardMedia>
                                        <img src={Sensouji} alt="sensouji" />
                                    </CardMedia>
                                </Card>
                                <div style={titleStyle}>Sensō-ji</div>
                                <div style={explanationStyle}>
                                    Sensō-ji (金龍山浅草寺 Kinryū-zan Sensō-ji) is an ancient Buddhist temple located in Asakusa, Tokyo, Japan. It is Tokyo's oldest temple, and one of its most significant. Formerly associated with the Tendai sect of Buddhism, it became independent after World War II. 
                                </div>
                            </section>

                            <section style={rightStyle}>
                                <div style={rightTopStyle}>
                                    <div style={labelStyle}>Choose the day</div>
                                    <DatePicker
                                        inline
                                        selected={this.state.toDate}
                                        onChange={this.handleChangeDate}
                                    />
                                </div>
                                <div>
                                    <div style={labelStyle}>2-3-1 Asakusa, Taitō-ku, Tokyo</div>
                                    <div style={labelStyle}>0.1Eth per a person</div>
                                    <div style={labelStyle}>How many ticket you buy?</div>
                                    <div>
                                        <form onSubmit={this.handleSubmit} style={formStyle}>
                                            {/*何人参加するか*/}
                                            <input type="number" min="1" step="1" value={this.state.number} onChange={this.handleChangeNumber} />
                                            <button type="submit" style={submitStyle}>Join!</button>
                                        </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            
        );
    }
}

export default Detail;

const backgroundStyle = {
    width: "100vw",
    height: "100vh",
    background: `url(${Sensouji})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
};

const containerStyle = {
    top:"10%",
    left:"7%",
    display: "flex",
    width: "80vw",
    height: "75vh",
    margin: "auto",
    padding: "50px 50px 0px 50px",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "white",
    position:"fixed",
    textAlign: "center"
};

const leftStyle = {
    width: 750
};

const rightStyle = {
    width: 350
};

const cardStyle = {
    width: 750
};

const titleStyle = {
    fontSize: 30
}

const explanationStyle = {
    width: 750,
    height: 300,
    fontSize: 20,
    wordWrap: "break-word",
    margin: "auto"
};

const rightTopStyle = {
    marginBottom: 100
}

const labelStyle = {
    fontSize: 20
}

const formStyle = {
    marginTop: 50,
    borderRadius: 5
}

const submitStyle = {
    background: "linear-gradient(-135deg, #CC00CC, #E3165B)",
    color: "white"
}