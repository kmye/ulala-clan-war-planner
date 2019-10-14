import React from "react";
import {Button} from "antd";
import {PlayerInputForm} from "./PlayerInputForm";
import {connect} from "react-redux";
import {addPlayer, closeForm, deletePlayer, initPlayers, openForm, updatePlayer} from "../../actions/player";
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

    deletePlayerClick = (playerId) => {
        // TODO dialog prompt for deletion
        this.props.deletePlayer(playerId)
    };

    render() {

        let players = "";

        if (this.props.players != null) {
            players = this.props.players.map((item, index) => (
                <PlayerCard key={index}
                            value={item}
                            playerIndex={index}
                            onUpdatePlayerClick={this.updatePlayerClick}
                            onDeletePlayerClick={this.deletePlayerClick}/>
            ))
        }

        return (
            <div style={{padding: '5px 20px'}}>
                <h3>Players</h3>
                <Button type="primary" block icon="plus" shape="round" onClick={this.openPlayerInputForm}>
                    Add Player
                </Button>
                <br/>
                {players}
                <PlayerInputForm wrappedComponentRef={this.formRef}
                                 player={this.props.player}
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
    deletePlayer
})(PlayerList)
