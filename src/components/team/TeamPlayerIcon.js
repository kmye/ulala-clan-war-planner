import React from 'react';
import {Col, Icon, Popover} from "antd";
import {PlayerCard} from "../player/PlayerCard";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../constants/dragItemTypes";
import {ULALA_CLASS_TAG_COLORS} from "../../constants/ulalaClasses";

export function TeamPlayerIcon(props) {

    let playerRepresentation;
    let {player} = props;

    const [{isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.PLAYER,
            playerObject: player
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    if (player != null) {
        let popoverContent = <PlayerCard value={player}/>
        let playerColor = ULALA_CLASS_TAG_COLORS[player.class.key - 1];

        playerRepresentation =
            <div ref={drag}
                 style={{
                     opacity: isDragging ? 0.5 : 1,
                     cursor: 'move'
                 }}>
                <Popover
                    content={popoverContent}
                    trigger="hover"><Icon style={{color: playerColor}} type="smile"/> {player.playerIndex + 1}
                </Popover>
            </div>
    } else {
        playerRepresentation = <Icon type="question"/>
    }

    return (
        <Col span={6}>{playerRepresentation}</Col>
    )
}
