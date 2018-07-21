import React, { Component } from 'react'
import { Card, CardMedia } from "material-ui/Card";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
// ここの画像は仮です
import Sensouji from "../../img/sensouji.jpg"

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            number: 1
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeNumber(e) {
        e.preventDefault();
        this.setState({
            number: e.target.value
        })
    }

    handleSubmit() {
        // ここにjoinを押した時の処理がきます。
        console.log("blockchain上の処理を行います。")
    }

    render() {
        console.log("detail componentのstate⬇️");
        console.log(this.state)
        return (
            <div style={backgroundStyle}>
                <div style={containerStyle}>
                    <section style={leftStyle}>
                        <Card style={cardStyle}>
                            <CardMedia>
                                <img src={Sensouji} alt="sensouji" />
                            </CardMedia>
                        </Card>
                        <div style={titleStyle}>浅草寺</div>
                        <div style={explanationStyle}>
                            texttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttex
                </div>
                    </section>

                    <section style={rightStyle}>
                        <div style={rightTopStyle}>
                            <div style={labelStyle}>行きたい日程を選択</div>
                            <DatePicker
                                inline
                                selected={this.state.startDate}
                                onChange={this.handleChangeDate}
                            />
                        </div>
                        <div>
                            <div style={labelStyle}>場所の情報</div>
                            <div style={labelStyle}>一人: 0.1Eth</div>
                            <div style={labelStyle}>How many people?</div>
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
        );
    }
}

export default Detail;

const backgroundStyle = {
    background: `url(${Sensouji})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
};

const containerStyle = {
    display: "flex",
    width: 1200,
    margin: "auto",
    padding: "100px 50px 0px 50px",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "white"
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
    marginTop: 100
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