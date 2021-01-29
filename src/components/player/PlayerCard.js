import React from 'react';
import {
  Button, Card, Col, Popconfirm, Row, Tag,
} from 'antd';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/drag_item_types';
import { ULALA_CLASS_TAG_COLORS } from '../../constants/classes';

export function PlayerCard(props) {
  const onUpdatePlayerClick = () => {
    props.onUpdatePlayerClick(props.value);
  };

  const onUnassignedPlayerClick = () => {
    props.onUnassignPlayerClick(props.value);
  };

  const onDeletePlayerClick = () => {
    props.onDeletePlayerClick(props.value.playerIndex);
  };

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.PLAYER,
      playerObject: props.value,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const assignedIcon = props.value.teamIndex != null
    ? <Button type="dashed" icon="check" onClick={onUnassignedPlayerClick} /> : '';

  let actions = '';

  if (props.shouldRenderActions) {
    actions = (
      <span>
        {assignedIcon}
        <Button type="dashed" icon="edit" onClick={onUpdatePlayerClick} />
        <Popconfirm
          title="Are you sure delete this record?"
          onConfirm={onDeletePlayerClick}
          onCancel={() => {
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="dashed" icon="delete" />
        </Popconfirm>
      </span>
    );
  } else {
    actions = <span>{assignedIcon}</span>;
  }

  const playerColor = ULALA_CLASS_TAG_COLORS[props.value.class.key - 1];

  const playerDescription = (
    <div style={{ position: 'absolute', right: 0 }}>
      <Tag color={playerColor}>{props.value.class.label}</Tag>
    </div>
  );

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <Card
        style={{ width: 'auto', marginTop: 5, minWidth: 270 }}
        title={`(${props.value.playerIndex + 1}) ${props.value.name}`}
        extra={actions}
      >
        <Row>
          <Col span={12}>{props.value.power.toLocaleString()}</Col>
          <Col span={12}>{playerDescription}</Col>
        </Row>
      </Card>
    </div>
  );
}
