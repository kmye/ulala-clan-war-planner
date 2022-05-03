/* eslint react/prop-types: 0 */

import React from 'react';
import { QuestionOutlined, SmileOutlined } from '@ant-design/icons';
import { Col, Popover } from 'antd';
import { useDrag } from 'react-dnd';
import { PlayerCard } from '../player/PlayerCard';
import { ItemTypes } from '../../constants/drag_item_types';
import { ULALA_CLASS_TAG_COLORS } from '../../constants/classes';

export function TeamPlayerIcon(props) {
  let playerRepresentation;
  const { player } = props;

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PLAYER,
    item: {
      playerObject: player,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const onUnassignPlayerClick = () => {
    props.onUnassignPlayerClick(player);
  };

  if (player != null) {
    const popoverContent = <PlayerCard value={player} onUnassignPlayerClick={onUnassignPlayerClick} />;
    const playerColor = ULALA_CLASS_TAG_COLORS[player.class.key - 1];

    playerRepresentation = (
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
      >
        <Popover
          content={popoverContent}
          trigger="hover"
        >
          <SmileOutlined style={{ color: playerColor }} />
          {' '}
          {player.playerIndex + 1}
          <p>{player.name}</p>
        </Popover>
      </div>
    );
  } else {
    playerRepresentation = <QuestionOutlined />;
  }

  return (
    <Col span={6}>{playerRepresentation}</Col>
  );
}
