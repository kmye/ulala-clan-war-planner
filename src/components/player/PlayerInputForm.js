/* eslint react/prop-types: 0 */

import React from "react";
import { Form, Input, InputNumber, Select } from 'antd';
import Modal from "antd/lib/modal";
import {connect} from "react-redux";

import {ULALA_CLASSES} from "../../constants/classes";

const mapStateToProps = state => ({
    ...state.playerInputForm
});

export const PlayerInputForm = (props) => {
    const [form] = Form.useForm();

    const onSave = async () => {
        const {onSave, playerInput} = props;

        const formValues = await form.validateFields();

        const isUpdateMode = playerInput != null;

        if (isUpdateMode) {
            formValues.playerIndex = playerInput.playerIndex;
            formValues.teamType = playerInput.teamType;
            formValues.teamIndex = playerInput.teamIndex;
        }
        onSave(formValues, isUpdateMode);
        form.resetFields();
    };

    return (
        <Modal
            title="Input Player Data"
            visible={props.visible}
            okText="Save"
            onOk={onSave}
            onCancel={props.onCancel}>
            <Form
                form={form}
                name="player-data-form"
                scrollToFirstError>
                <Form.Item name="name" label="Name">
                    <Input/>
                </Form.Item>

                <Form.Item label="Power" name='power'
                           rules={[{required: true, message: 'Power is required.'}]}>
                     <InputNumber min={1}/>
                 </Form.Item>

                <Form.Item label="Class" name={"class"} rules={[{required: true, message: 'Class is required.'}]}>
                    <Select
                        showSearch
                        labelInValue
                        style={{width: 200}}
                        placeholder="Select class"
                        optionFilterProp="children"
                        filterOption={
                            (input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                    >
                        {
                            ULALA_CLASSES.map((item) => {
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

connect(mapStateToProps)(PlayerInputForm)




