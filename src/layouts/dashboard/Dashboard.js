import React, { Component } from 'react'
import Background from '../../img/sensouji.jpg';
import "../../css/fonts.css"
import { injectGlobal } from 'styled-components';
import selima from '../../fonts/selima/selima_.otf';

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    console.log(this.props.authData)
    return (
      <main className="container" style={backgroundStyle}>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <section>
              <div>
                <div className="title" style={titleStyle}>Welcome Home {this.props.authData.name}!!</div>
              </div>
            </section>
            <section>
              <div>
                <h1>How to use this Application</h1>
              </div>
            </section>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard

const homeStyle = {
  width: "50vw",
  height: "1vh",
  margin: "200px auto auto auto",
  textAlign: "center",
  backgroundColor: "rgba(128,128,128,0.3)",
  borderRadius: 30,
  display: "table"
}

const backgroundStyle = {
  width: "100vw",
  height: "100vh",
  background: `url(${Background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
}

const titleStyle = {
  height: "30vh",
  width: "100vw",
  textAlign: "center",
  display: "table-cell",
  fontSize: "750%",
  verticalAlign: "middle",
  fontFamily: "selima",
  color: "white"
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
        c-webkit-transform: scale(1);
        transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    .title:hover {
        font-family: 'selima', sans-serif;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
`;
