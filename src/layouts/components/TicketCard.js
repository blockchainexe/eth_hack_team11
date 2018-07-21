import React from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Sensouji from "../../img/sensouji.jpg"

const TicketCard = (props) => {
    return (
        <div>
            <Card style={cardStyle}>
                <CardMedia overlay={<CardTitle title="Sensou-ji" />}>
                    <img src={Sensouji} alt="project-image" />
                </CardMedia>
                <CardText>
                    fucking awesome super cool temple!
            </CardText>
            <input
                type="button"
                className="Girl-attack-button"
                // onClick={e => props.clickBattleHandler(e, mygirl.girlsId)}
                value="Refund"
            />
            </Card>
        </div>
    );
}

export default TicketCard

const cardStyle = {
    width: 312.5,
    marginTop: 50
}
