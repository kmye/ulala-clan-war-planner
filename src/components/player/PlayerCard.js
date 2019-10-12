import React from 'react';
import {Button, Card} from "antd";

const {Meta} = Card;

export class PlayerCard extends React.Component {

    onUpdatePlayerClick = () => {
        this.props.onUpdatePlayerClick(this.props.value);
    };

    onDeletePlayerClick = () => {
        this.props.onDeletePlayerClick(this.props.value.playerId);
    };

    render() {
        let actions = <span>
            <Button type="dashed" icon="edit" onClick={this.onUpdatePlayerClick}/>
            <Button type="dashed" icon="delete" onClick={this.onDeletePlayerClick}/>
        </span>

        return (
            <div>
                <Card
                    hoverable
                    style={{width: "auto", marginTop:5}}
                    title={this.props.value.name}
                    extra={actions}
                >
                    <Meta title={this.props.value.class.label}
                          description={this.props.value.power}/>
                </Card>
            </div>
        );
    }
}

