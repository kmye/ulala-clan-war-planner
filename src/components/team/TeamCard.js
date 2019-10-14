import React from 'react';
import {Card, Col, Icon, Row} from 'antd';
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../constants/dragItemTypes";

export function TeamCard(props) {

    let teamPower = 0;

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.PLAYER,
        drop: (item) => props.updatePlayerToTeam(item.playerObject, props.team),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    if (props.team != null && props.team.length > 0) {
        props.team.players.forEach(function (element) {
            teamPower += element ? element.power : 0;
        });
    }

    return (
        <div ref={drop}>
            <Card
                style={{
                    background: isOver ? "#f6ffed" : "white",
                }}
                title={"Team " + (props.team.teamIndex + 1 + " / Power: " + teamPower)}>
                <Row>
                    {props.team.players.map((value, index) => {
                        let playerRepresentation;
                        if(value) {
                            playerRepresentation = <Icon type="user" />
                        } else {
                            playerRepresentation = <Icon type="question" />
                        }
                        return (
                            <Col key={index} span={6}>{playerRepresentation}</Col>
                        )
                    })}
                </Row>
            </Card>
        </div>
    )
}



