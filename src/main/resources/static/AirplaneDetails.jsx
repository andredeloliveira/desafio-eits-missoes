/**
 Component that is responsible to show all the data and client-side information related to a AirplaneForm
 @see Airplane (Java)
**/
import React from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie';
import Container from 'muicss/lib/react/container';
import Button from 'muicss/lib/react/button';
import Divider from 'material-ui/Divider';
import {hashHistory} from 'react-router';
import {MissoesLoading} from './MissoesLoading.jsx';
import {ConfirmActionDialog} from './dialogs/ConfirmActionDialog.jsx';
import {findAirplaneById, removeAirplane} from './actions/airplaneActions';

@connect((Store) => {
    return {airplanes: Store.airplaneReducer, login: Store.loginReducer}
})
export class AirplaneDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {dispatch, params} = this.props;
        const airplaneId = params.id;
        dispatch(findAirplaneById(airplaneId, dispatch))
    }

    goToUpdatePage() {
        const {id} = this.props.params;
        hashHistory.push('/aeronaves/update/' + id)
    }

    goBack() {
        hashHistory.goBack()
    }

    isAdmin() {
        const currentUser = this.props.login.currentUser || cookie.load('currentUser');
        return currentUser.perfilAcesso === 'ADMINISTRADOR';
    }

    render() {
        const {dispatch} = this.props;
        const {airplane} = this.props.airplanes;
        const airplaneId = this.props.params.id;
        const labelStyle = {
            fontSize: "1.2em"
        }
        const spanStyle = {
            fontSize: "1.7em",
            paddingLeft: "40px"
        }
        const buttonStyle = {
            float: "right",
            marginTop: "20px"
        }
        if (!airplane) {
            return <MissoesLoading/>
        }
        return (
            <Container>
                <h1>Detalhes da aeronave</h1>
                <label style={labelStyle}>Matrícula</label>
                <span style={spanStyle}>{airplane.subscriptionNumber}</span>
                <Divider/>
                <label style={labelStyle}>Número de Assentos</label>
                <span style={spanStyle}>{airplane.seatsNumber}</span>
                <Divider/>
                <label style={labelStyle}>Modelo</label>
                <span style={spanStyle}>{airplane.airplaneModel.manufacturer.name + ' - ' + airplane.airplaneModel.name}</span>
                <Divider/>
                <label style={labelStyle}>Horas de Vôo</label>
                <span style={spanStyle}>{airplane.totalFlightTime || 0}</span>
                <div>
                    <Button variant="flat" color="primary" style={buttonStyle} disabled={!this.isAdmin()} onClick={this.goToUpdatePage.bind(this)}>Atualizar</Button>
                    <ConfirmActionDialog actionLabel="Remover" style={buttonStyle} action={removeAirplane} message="Tem certeza que deseja remover a aeronave ?" itemId={airplaneId} dispatch={dispatch} shouldGoBack={true} isAdmin={this.isAdmin()}/>
                    <Button variant="flat" color="accent" style={buttonStyle} disabled={!this.isAdmin()} onClick={this.goBack.bind(this)}>Cancelar</Button>
                </div>
            </Container>
        )
    }
}
