import React from 'react';
import {Badge, Card, Row, Tooltip} from 'antd';
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../constants/dragItemTypes";
import {TeamPlayerIcon} from "./TeamPlayerIcon";

export function TeamCard(props) {

    let teamPower = 0;
    let totalPlayers = 0;

    const {team} = props;

    if (team.players != null) {
        team.players.forEach(function (element) {
            if (element != null) {
                ++totalPlayers;
            }
            teamPower += element ? parseInt(element.power) : 0;
        });
    }

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.PLAYER,
        drop: (item) => props.updatePlayerToTeam(item.playerObject, team),
        canDrop: () => {
            return totalPlayers < 4
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const onUnassignPlayerClick = (player) => {
        props.onUnassignPlayerClick(player);
    };

    return (
        <div ref={drop}>
            <Card
                style={{
                    width: "auto",
                    background: isOver ? "#f6ffed" : "white",
                }}
                extra={<Tooltip placement="top" title="Power">
                    <Badge count={teamPower.toLocaleString()}
                           overflowCount={99999999}
                           style={{backgroundColor: '#52c41a'}}/></Tooltip>}
                title={"Team " + (team.teamIndex + 1)}>
                <Row>
                    {
                        team.players.map((element, index) => {
                            return <TeamPlayerIcon key={index} player={element} onUnassignPlayerClick={onUnassignPlayerClick}/>
                        })
                    }
                </Row>
            </Card>
        </div>
    )
}



