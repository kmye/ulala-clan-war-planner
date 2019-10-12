import React from "react";
import {Form, Input, Select} from 'antd';
import Modal from "antd/lib/modal";
import {connect} from "react-redux";

import ULALA_CLASSES from "../../constants/ulalaClasses";

const mapStateToProps = state => ({
    ...state.playerInputForm
});

export const PlayerInputForm = Form.create({
    mapPropsToFields: (props) => {
        const {player} = props;

        if (player != null) {
            return {
                name: Form.createFormField({
                    value: player.name,
                }),
                power: Form.createFormField({
                    value: player.power,
                }),
                class: Form.createFormField({
                    value: player.class,
                })
            };
        }

    }
})(
    class extends React.Component {

        onCancel = () => {
            const {onCancel} = this.props;
            onCancel();
        };

        onSave = () => {
            const {form, onSave, player} = this.props;

            form.validateFields((err, formValues) => {
                if (err) {
                    return;
                }

                const isUpdateMode = player != null;
                if(isUpdateMode) {
                    formValues.playerId = player.playerId;
                }

                onSave(formValues, isUpdateMode);

                form.resetFields();
            });

        };

        render() {

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
                                rules: [{required: true, message: 'Player name is required.'}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Power">
                            {getFieldDecorator('power', {
                                rules: [{required: true, message: 'Power is required.'}],
                            })(<Input/>)}
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
)


connect(mapStateToProps)(PlayerInputForm)

