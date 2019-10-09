import React from "react";
import {Form, Input} from 'antd';
import Modal from "antd/lib/modal";

export const PlayerInputForm = Form.create({name: 'form_in_modal'})(
    class extends React.Component {

        render() {
            const {visible, form, onSave, onCancel} = this.props;
            const {getFieldDecorator} = form;

            return (
                <Modal
                    title="Input Player Data"
                    visible={visible}
                    okText="Save"
                    onOk={onSave}
                    onCancel={onCancel}>

                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Player name is required.' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Power">
                            {getFieldDecorator('power', {
                                rules: [{ required: true, message: 'Power is required.' }],
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }

    }
)

