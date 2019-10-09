import React from "react";
import {Form, Input, Select} from 'antd';
import Modal from "antd/lib/modal";
import ULALA_CLASSES from "../../constants/ulalaClasses";

export const PlayerInputForm = Form.create({

})(
    class extends React.Component {

        render() {
            const {visible, form, onSave, onCancel, player} = this.props;
            const {getFieldDecorator} = form;

            console.log("render player", player)
            console.log("getFieldDecorator", getFieldDecorator)
            return (
                <Modal
                    title="Input Player Data"
                    visible={visible}
                    okText="Save"
                    onOk={onSave}
                    onCancel={onCancel}>

                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('player.name', {
                                rules: [{required: true, message: 'Player name is required.'}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Power">
                            {getFieldDecorator('player.power', {
                                rules: [{required: true, message: 'Power is required.'}],
                            })(<Input/>)}
                        </Form.Item>

                        <Form.Item label="Class">
                            {getFieldDecorator('player.class', {
                                rules: [{required: true, message: 'Class is required.'}],
                            })(<Select
                                showSearch
                                labelInValue
                                style={{width: 200}}
                                placeholder="Select class"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {ULALA_CLASSES.map((item) => {
                                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                })}
                            </Select>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }

    }
)

