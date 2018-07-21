import React, { Component } from 'react'

// この画像は仮に置いているだけです。本来であれば、firebaseから取ってきます。

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {

    console.log("this is authData from uPort")
    console.log(this.props.authData);
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <div style={profileStyle}>
              <div style={contentStyle}>
                <div><img src={this.props.authData.avatar.uri} alt="avatar" style={imageStyle}/></div>
                <div>Name: {this.props.authData.name} Rodorigues</div>
                <div>Nationality: {this.props.authData.country}</div>
                <div>Phone: {this.props.authData.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile

const profileStyle = {
  width: 500,
  margin: "80px auto auto auto",
  height: 600,
  backgroundColor: "#6633FF",
  padding: "auto"
}

const contentStyle = {
  margin: "auto"
}

const imageStyle = {
  borderRadius: "50%",
  marginBottom: 50,
  height: 300,
  width: 300
}