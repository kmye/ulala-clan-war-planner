import React from 'react';
import {Card} from "antd";
import {PlayerInputForm} from "./PlayerInputForm";

const {Meta} = Card;

export class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            showPlayerInputForm: false
        };

        this.onSavePlayerData = this.onSavePlayerData.bind(this);
    }

    render() {
        const haveData = this.state.value !== null;

        let playerContent;

        if (haveData) {
            playerContent = <Meta title={this.state.value.name} description={this.state.value.power}/>


        } else {
            playerContent = <Meta title="Add Player"/>
        }

        return (
            <div>
                  <Card
                      hoverable
                      style={{width: 150}}
                      onClick={this.openPlayerInputForm}>
                    {playerContent}
                  </Card>
                <PlayerInputForm wrappedComponentRef={this.saveFormRef}
                                 player={this.state.value}
                                 onSave={this.onSavePlayerData}
                                 onCancel={this.onCancelSavePlayerData}
                                 visible={this.state.showPlayerInputForm}/>
            </div>
        );
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    onSavePlayerData = () => {
        const {form} = this.formRef.props;

        form.validateFields((err, formValues) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', formValues);
            this.setState({
                value: formValues,
            })

            this.props.onChange(formValues, this.props.playerIndex);

            form.resetFields();
            this.setState({showPlayerInputForm: false});
        });

    }

    onCancelSavePlayerData = () => {
        this.setState({
            showPlayerInputForm: false
        })
    }

    openPlayerInputForm = () => {

        this.setState({
            showPlayerInputForm: true
        })
    }
}
