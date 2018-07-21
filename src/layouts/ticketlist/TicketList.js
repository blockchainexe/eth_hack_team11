import React, { Component } from 'react'
import { Link } from "react-router"
import { Carousel } from 'react-responsive-carousel';
import TicketCard from '../components/TicketCard';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { injectGlobal } from 'styled-components';
import selima from '../../fonts/selima/selima_.otf';

import zibri from "../../img/zibri.jpg";
import kannon from "../../img/kannon.jpg";
import firework from "../../img/firework.jpg";
import Sensouji from "../../img/sensouji.jpg";

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
                        <section style={carouselStyle}>
                            <Carousel autoPlay >
                                <div style={imgStyle}>
                                    <img src={Sensouji} />
                                    <p className="legend">Sensō-ji</p>
                                </div>
                                <div>
                                    <img src={kannon} />
                                    <p className="legend">Kannon Bridge</p>
                                </div>
                                <div>
                                    <img src={firework} />
                                    <p className="legend">Sumida Fireworks</p>
                                </div>
                                <div>
                                    <img src={zibri} />
                                    <p className="legend">Zibri museum</p>
                                </div>

                            </Carousel>
                        </section>
                        <section style={{width:"100%"}}>
                            <h1 className="text" style={textStyle}>NEW ARRIVAL</h1>
                        </section>
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
                        <section style={{ width: "100%" }}>
                            <h1 className="text" style={textStyle}>HIT LIST</h1>
                        </section>
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
    marginTop:0,
    marginBottom:20,
    marginLeft: "auto",
    marginRight:"auto",
    width: "70vw",
    justifyContent: "space-between",
    listStyle: "none",
    textAlign: "center",
    padding: 0
}

const carouselStyle = {
    textAlign:"center",
    margin: 0,
    padding:40,
    zIndex: -100
}

const imgStyle = {
    width: "auto",
    height: "70%"
}



const textStyle = {
    textAlign: "center",
    display: "table-cell",
    fontSize: "550%",
    verticalAlign: "middle",
    fontFamily: "selima",
    marginTop: 0,
    marginBottom:0,
    margin:"auto"
}

injectGlobal`
    @font-face {
        font-family: 'selima';
        src: url(${selima}) format('opentype');
        font-weight: normal;
        font-style: normal;
    }

    .title {
        font-family: 'selima', sans-serif;
        text-align: center
    }

`;

