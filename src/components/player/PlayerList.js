import React from "react";
import {Button, Col, Divider, Empty, Row} from "antd";
import {PlayerInputForm} from "./PlayerInputForm";
import {connect} from "react-redux";
import {
    addPlayer,
    closeForm,
    deletePlayer,
    initPlayers,
    openForm,
    sortPlayersByPower,
    updatePlayer
} from "../../actions/player";
import {PlayerCard} from "./PlayerCard";

const mapStateToProps = state => ({
    ...state.playerInputForm,
    ...state.player
});

class PlayerList extends React.Component {

    componentDidMount() {
        this.props.initPlayers();
    }

    openPlayerInputForm = () => {
        this.props.openForm(null);
    };

    closePlayerInputForm = () => {
        this.props.closeForm();
    };

    formRef = (ref) => {
        this.playerInputForm = ref
    };

    savePlayerInfo = (formValues, isUpdateMode) => {
        isUpdateMode ? this.props.updatePlayer(formValues) : this.props.addPlayer(formValues);
        this.props.closeForm();
    };

    updatePlayerClick = (player) => {
        this.props.openForm(player);
    };

    deletePlayerClick = (playerIndex) => {
        this.props.deletePlayer(playerIndex)
    };

    sortPlayersAscending = () => {
        this.props.sortPlayersByPower(true)
    };

    sortPlayersDescending = () => {
        this.props.sortPlayersByPower(false)
    };

    render() {

        let players = "";
        let additionalActions = ""

        if (this.props.players != null && this.props.players.length > 0) {
            players = this.props.players.map((item, index) => (
                <PlayerCard key={index}
                            value={item}
                            shouldRenderActions={true}
                            onUpdatePlayerClick={this.updatePlayerClick}
                            onDeletePlayerClick={this.deletePlayerClick}/>
            ));

            additionalActions = <Col push={18}>
                <Button type="default" icon="sort-ascending" onClick={this.sortPlayersAscending}/>
                <Button type="default" icon="sort-descending" onClick={this.sortPlayersDescending}/>
            </Col>
        } else {
            players = <div style={{display: "flex", alignItems: "center", height: "80vh"}}><Empty/></div>
        }

        return (
            <div style={{padding: '5px 20px'}}>
                <h3>Players</h3>
                <Button type="primary" block icon="plus" shape="round" onClick={this.openPlayerInputForm}>
                    Add Player
                </Button>
                <Divider/>
                <Row>{additionalActions}</Row>
                <Row type="flex" justify="space-around" align="top">
                    <Col>{players}</Col>
                </Row>
                <PlayerInputForm wrappedComponentRef={this.formRef}
                                 playerInput={this.props.playerInput}
                                 onSave={this.savePlayerInfo}
                                 onCancel={this.closePlayerInputForm}
                                 visible={this.props.visible}/>
            </div>
        )
    }


};

export default connect(mapStateToProps, {
    openForm,
    closeForm,
    initPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer,
    sortPlayersByPower
})(PlayerList)
