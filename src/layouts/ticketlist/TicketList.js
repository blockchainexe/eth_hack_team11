import React, { Component } from 'react'
import { Link } from "react-router"

import TicketCard from '../components/TicketCard';

class TicketList extends Component {
    constructor(props, { authData }) {
        super(props);
        authData = this.props
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
                                    return (
                                        <li>
                                            <Link to="/detail/sensouji">
                                                <TicketCard key={i} />
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
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
    listStyle: "none"
}