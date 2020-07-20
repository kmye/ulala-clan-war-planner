import React from "react";
import {Button, Col, Divider, Empty, message, Row, Upload} from "antd";
import {PlayerInputForm} from "./PlayerInputForm";
import {connect} from "react-redux";
import {
    addPlayer,
    autoAssignPlayers,
    unassignPlayer,
    clearPlayers,
    closeForm,
    deletePlayer,
    initPlayers,
    openForm,
    sortPlayersByPower,
    updatePlayer
} from "../../actions/player";
import {PlayerCard} from "./PlayerCard";
import {ExportToCsv} from "export-to-csv";
import { importCSVService } from "../../services/ImportCSVService";

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

    unassignPlayerClick = (player) => {
        this.props.unassignPlayer(player);
    }

    deletePlayerClick = (playerIndex) => {
        this.props.deletePlayer(playerIndex)
    };

    sortPlayersAscending = () => {
        this.props.sortPlayersByPower(true)
    };

    sortPlayersDescending = () => {
        this.props.sortPlayersByPower(false)
    };

    autoAssign = () => {
        // TODO
        message.loading("Work in progress...");
        this.props.autoAssignPlayers()
    };

    exportData = () => {
        // export all player data to csv
        const formattedData = this.props.players.map((item) => {
            console.log(item);
            if(item.teamIndex === undefined) {
                return {
                    name: item.name,
                    power: item.power,
                    class: item.class.label,
                    team: ""
                }
            } else {
                return {
                    name: item.name,
                    power: item.power,
                    class: item.class.label,
                    team: item.teamType + " - Team " +  (item.teamIndex+1),
                }
            }
        });

        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(formattedData);
    };

    renderAddPlayerButton = () => {

        let props = this.props;

        const fileUploadProps = {
            name: "file",
            accept: '.csv,application/vnd.ms-excel',
            action: '#',
            showUploadList: false,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    let reader = new FileReader();
                    reader.addEventListener('load', function (e) {
                        props.clearPlayers();
                        const importedPlayers = importCSVService.processRows(e.target.result);
                        importedPlayers.forEach(player => {
                            props.addPlayer(player)
                        })
                    });

                    reader.readAsText(info.file);
                }
                if (info.file.status === 'done') {
                    console.log("done")
                } else if (info.file.status === 'error') {
                    message.error("Oops, there is an error.");
                }
            },
            beforeUpload(file) {
                return false
            },
        };

        return (
            <Row gutter={8}>
                <Col span={12}>
                    <Button type="primary" icon="plus" shape="round"
                            onClick={this.openPlayerInputForm}>Add</Button>
                </Col>
                <Col span={12}>
                    <Upload {...fileUploadProps}>
                        <Button type="primary" icon="import" shape="round">Import</Button>
                    </Upload>
                </Col>
            </Row>
        );
    }

    render() {

        let players = "";
        let additionalActions = "";
        let totalPlayers = 0;

        const havePlayers = this.props.players != null && this.props.players.length > 0;

        if (havePlayers) {
            totalPlayers = this.props.players.length;
            players = this.props.players.map((item, index) => (
                <PlayerCard key={index}
                            value={item}
                            shouldRenderActions={true}
                            onUnassignPlayerClick={this.unassignPlayerClick}
                            onUpdatePlayerClick={this.updatePlayerClick}
                            onDeletePlayerClick={this.deletePlayerClick}/>
            ));
            additionalActions =
                <Col>
                    <Button type="default" icon="sort-ascending" onClick={this.sortPlayersAscending}/>
                    <Button type="default" icon="sort-descending" onClick={this.sortPlayersDescending}/>
                    <Button type="default" icon="solution" onClick={this.autoAssign}/>
                    <Button type="default" icon="export" onClick={this.exportData}>Export to CSV</Button>
                </Col>
        } else {
            players =
                <div style={{display: "flex", alignItems: "center", height: "80vh"}}>
                    <Empty description={"Get started by adding players."}>
                        {this.renderAddPlayerButton()}
                    </Empty>
                </div>
        }

        return (
            <div style={{padding: '20px 20px'}}>
                <h3>Players{havePlayers && ("(" + totalPlayers + "/80)")}</h3>
                {havePlayers && this.renderAddPlayerButton()}
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
    clearPlayers,
    unassignPlayer,
    sortPlayersByPower,
    autoAssignPlayers
})(PlayerList)
