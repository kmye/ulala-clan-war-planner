/* eslint react/prop-types: 0 */

import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, InputNumber, Select } from 'antd';
import Modal from "antd/lib/modal";
import {connect} from "react-redux";

import {ULALA_CLASSES} from "../../constants/classes";

const mapStateToProps = state => ({
    ...state.playerInputForm
});

export const PlayerInputForm = Form.create({
    mapPropsToFields: (props) => {
        const {playerInput} = props;

        if (playerInput != null) {
            return {
                name: Form.createFormField({
                    value: playerInput.name,
                }),
                power: Form.createFormField({
                    value: playerInput.power,
                }),
                class: Form.createFormField({
                    value: playerInput.class,
                })
            };
        }

    }
})(
    class PlayerInputForm extends React.Component {
        onCancel = () => {
            const {onCancel} = this.props;
            onCancel();
        };

        onSave = () => {
            const {form, onSave, playerInput} = this.props;

            form.validateFields((err, formValues) => {
                if (err) {
                    return;
                }

                const isUpdateMode = playerInput != null;

                if (isUpdateMode) {
                    formValues.playerIndex = playerInput.playerIndex;
                    formValues.teamType = playerInput.teamType;
                    formValues.teamIndex = playerInput.teamIndex;
                }

                onSave(formValues, isUpdateMode);

                form.resetFields();
            });

        };

        render() {

            // eslint-disable-next-line react/prop-types
            const {form} = this.props;
            const {getFieldDecorator} = form;

            return (
                <Modal
                    title="Input Player Data"
                    visible={this.props.visible}
                    okText="Save"
                    onOk={this.onSave}
                    onCancel={this.onCancel}>

                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [
                                    {required: true, message: 'Player name is required.'},
                                    {pattern: new RegExp('^\\w*$'), message: 'Player name must be alphanumeric input only.'},
                                    {max: 15, message: 'Player name cannot exceed 15 characters'}
                                ],
                            })(<Input allowClear/>)}
                        </Form.Item>

                        <Form.Item label="Power">
                            {getFieldDecorator('power', {
                                rules: [{required: true, message: 'Power is required.'}],
                            })(<InputNumber min={1}/>)}
                        </Form.Item>

                        <Form.Item label="Class">
                            {getFieldDecorator('class', {
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


);

connect(mapStateToProps)(PlayerInputForm)




