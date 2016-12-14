import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Input from 'muicss/lib/react/input';
import Chip from 'material-ui/Chip';
import Form from 'muicss/lib/react/form';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Button from 'muicss/lib/react/button';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import Files from 'react-files';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Container from 'muicss/lib/react/container';
import { Formfeedback } from './Formfeedback.jsx';
import { MissoesLoading } from './MissoesLoading.jsx';
import { MissionPassengers } from './MissionPassengers.jsx';
import { MissionPilots } from './MissionPilots.jsx';
import { findAllAirplanes } from './actions/airplaneActions';
import { findAllPilots, findAllPassengers } from './actions/userActions';
import { findAllAirports } from './actions/airportActions';
import { insertMission, findMissionById, updateMission, findMissionPassengersByMission, findMissionPilotsByMission } from './actions/missionActions';
import { uploadFile } from './actions/fileUploadActions';


//TODO(andredeloliveira): consider refactoring this massive component and splitting into smaller components
@connect((Store) => {
  return {
    airplanes: Store.airplaneReducer,
    users: Store.userReducer,
    airports: Store.airportReducer,
    missions: Store.missionReducer,
    auth: Store.loginReducer,
    fileUpload: Store.fileUploadReducer,
  }
})
export class MissionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAirplane: null,
      pilotsAutoComplete: [],
      passengersAutoComplete: [],
      selectedPilots: [],
      selectedPassengers: [],
      pilotsSearchInput: '',
      passengersSearchInput: '',
      selectedPassenger: null,
      selectedPilot: null,
      selectedTo: null,
      selectedFrom: null,
      file: null,
      filesError: null,
    }
    this.handleSelectAirplaneChange = this.handleSelectAirplaneChange.bind(this);
    this.handleUpdatePassenger = this.handleUpdatePassenger.bind(this);
    this.handleUpdatePilot = this.handleUpdatePilot.bind(this);
    this.handleUpdateFrom = this.handleUpdateFrom.bind(this);
    this.handleUpdateTo = this.handleUpdateTo.bind(this);
    this.handleUpdateFiles = this.handleUpdateFiles.bind(this);
    this.handleUpdateFilesError = this.handleUpdateFilesError.bind(this);
    this.airplaneOptionsRender = this.airplaneOptionsRender.bind(this);
    this.mappedPassengers = this.mappedPassengers.bind(this);
    this.mappedPilots = this.mappedPilots.bind(this);
    this.mappedAirports = this.mappedAirports.bind(this);
    this.renderSelectedPassengers = this.renderSelectedPassengers.bind(this);
    this.renderSelectedPilots = this.renderSelectedPilots.bind(this);
    this.renderPassengersAutoComplete = this.renderPassengersAutoComplete.bind(this);
    this.renderPilotsAutoComplete = this.renderPilotsAutoComplete.bind(this);
    this.renderCurrentPassengersForUpdate = this.renderCurrentPassengersForUpdate.bind(this);
    this.renderCurrentPilotsForUpdate = this.renderCurrentPilotsForUpdate.bind(this);
    this.submitData = this.submitData.bind(this);
    this.currentDateTime = this.currentDateTime.bind(this);
    this.missionToErrorText = this.missionToErrorText.bind(this);
    this.missionFromText = this.missionFromText.bind(this);
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    //if we are updating all the data needed will be loaded, yaay!
    if (params.id) {
      dispatch(findMissionById(params.id, dispatch))
      dispatch(findMissionPassengersByMission(params.id, dispatch))
      dispatch(findMissionPilotsByMission(params.id, dispatch))
    }
    dispatch(findAllAirplanes(dispatch))
    dispatch(findAllPilots(dispatch))
    dispatch(findAllPassengers(dispatch))
    dispatch(findAllAirports(dispatch))
  }

  airplaneOptionsRender() {
    const { airplanes } = this.props.airplanes;
    if (airplanes) {
      return airplanes.map( (airplane, index) => {
        const airplaneText = airplane.airplaneModel.manufacturer.name +
        ' ' + airplane.airplaneModel.name +
        ' - ' + airplane.subscriptionNumber;
        const airplaneStringJSONValue = JSON.stringify(airplane);
        return <Option key={index} value={airplaneStringJSONValue} label={airplaneText} />
      })
    } else {
      return <MissoesLoading />
    }
  }


  mappedPassengers() {
    const { passengers } = this.props.users;
    if (passengers) {
      return passengers.map((passenger, index) => {
        return {
          text: passenger.name,
          value: index,
          passenger: passenger,
        }
      })
    } else {
      return [];
    }
  }

  mappedAirports() {
    const { airports } = this.props.airports;
    if (airports) {
      return airports.map((airport, index) => {
        return {
          text: airport.acronym + ' - ' + airport.name,
          value: index,
          airport: airport,
        }
      })
    } else {
      return [];
    }
  }

  mappedPilots() {
    const { pilots } = this.props.users;
    if (pilots) {
      return pilots.map((pilot, index) => {
        return {
          text: pilot.name,
          value: index,
          pilot: pilot,
        }
      })
    } else {
      return [];
    }
  }

  handleDeleteSelectedPassenger(passengerToRemove, event) {
    let { selectedPassengers } = this.state;
    const indexOfPassengerToRemove = selectedPassengers.indexOf(passengerToRemove)
    selectedPassengers.splice(indexOfPassengerToRemove, 1)
    this.setState({ selectedPassengers })
  }

  handleDeleteSelectedPilot(pilotToRemove, event) {
    let { selectedPilots } = this.state;
    const indexOfPilotToRemove = selectedPilots.indexOf(pilotToRemove)
    selectedPilots.splice(indexOfPilotToRemove, 1)
    this.setState({ selectedPilots })
  }

  renderCurrentPassengersForUpdate() {
    const chipStyle = { margin: 4}
    const { missionPassengers } = this.props.missions;
    if (missionPassengers) {
      return missionPassengers.map((passenger) => {
        return  <Chip
                style={chipStyle}
                key={passenger.passenger.id}
                onRequestDelete={this.handleDeleteSelectedPassenger.bind(this, passenger.passenger)}
                >
                {passenger.passenger.name}
               </Chip>
      })
    }
  }

  renderSelectedPassengers() {
    const chipStyle = { margin: 4}
    const { params, dispatch } = this.props;
    const { mission, missionPassengers } = this.props.missions;
    return this.state.selectedPassengers.map((passenger) => {
      return <Chip
              style={chipStyle}
              key={passenger.id}
              onRequestDelete={this.handleDeleteSelectedPassenger.bind(this, passenger)}
             >
              {passenger.name}
             </Chip>
    })
  }

  renderCurrentPilotsForUpdate() {
    const chipStyle = { margin: 4}
    const { missionPilots } = this.props.missions;
    if (missionPilots) {
      return missionPilots.map((pilot) => {
        return  <Chip
          style={chipStyle}
          key={pilot.pilot.id}
          onRequestDelete={this.handleDeleteSelectedPilot.bind(this, pilot.pilot)}
          >
          {pilot.pilot.name}
        </Chip>
      })
    }
  }

  renderSelectedPilots() {
    const chipStyle = { margin: 4}
    const { params, dispatch } = this.props;
    const { mission } = this.props.missions;
    return this.state.selectedPilots.map((pilot) => {
      return <Chip
                style={chipStyle}
                key={pilot.id}
                onRequestDelete={this.handleDeleteSelectedPilot.bind(this, pilot)}
             >
             {pilot.name}
             </Chip>
    })
  }

  renderPassengersAutoComplete() {
    return this.state.passengersAutoComplete.map((passengerAutoComplete) => {
      return passengerAutoComplete;
    })
  }

  renderPilotsAutoComplete() {
    return this.state.pilotsAutoComplete.map((pilotAutoComplete) => {
      return pilotAutoComplete;
    })
  }

  handleSelectAirplaneChange(event, index, airplane) {
    this.setState({
      selectedAirplane: airplane
    })
  }
  submitData(event) {
    event.preventDefault();
    const { dispatch, params } = this.props;
    const { mission, missionPassengers, missionPilots } = this.props.missions;
    const { file } = this.props.fileUpload;
    const currentUser = this.props.auth.currentUser;
    const updatingCondition = mission && params.id;
    const newMission = {
      mission: {
        dateTime: event.target.date.value + ' ' + event.target.time.value,
        missionTo: this.state.selectedTo || mission.missionTo,
        missionFrom: this.state.selectedFrom || mission.missionTo,
        airplane: JSON.parse(event.target.airplane.value),
        reason: event.target.reason.value,
        attachedFile: null,
      },
      planner: currentUser,
      passengers: this.state.selectedPassengers,
      pilots: this.state.selectedPilots,
    }
    if (updatingCondition) {
      newMission.id = mission.id;

      console.log(newMission)
      //dispatch(updateMission(newMission, currentUser, dispatch))
    } else {
      dispatch(insertMission(newMission, currentUser, dispatch))
      //cleaning all fields that I'm actually able to ;/
      event.target.date.value = '';
      event.target.time.value = '';
      event.target.airplane.value = '';
      event.target.reason.value = '';
      this.setState({
        selectedPassengers: [],
        selectedPilots: [],
        //TODO find a way to erase the value of the inputs here...
        pilotsSearchInput: ' ',
        passengersSearchInput: ' ',
        selectedTo: null,
        selectedFrom: null,
      })
    }
  }


  handleUpdateFrom(autocompleteResult, e) {
    this.setState({
      selectedFrom: autocompleteResult.airport
    })
  }

  handleUpdateTo(autocompleteResult) {
    this.setState({
      selectedTo: autocompleteResult.airport
    })
  }

  handleUpdatePassenger(autocompleteResult) {
    let actualSelectedPassengers = this.state.selectedPassengers;
    this.setState({
      selectedPassenger: autocompleteResult.passenger,
    })
    //We are getting the value from state, so we can be sure that the value was truly updated..
    //as well not allowing an existing value to be added. An error will be fired at the Chips component
    const selectedPassengerFromState = this.state.selectedPassenger;
    if (actualSelectedPassengers.indexOf(selectedPassengerFromState) < 0) {
      actualSelectedPassengers.push(selectedPassengerFromState)
      this.setState({
        selectedPassengers: actualSelectedPassengers,
        passengersSearchInput: ' ',
      })
    }
  }

  handleUpdatePilot(autocompleteResult) {
    let actualSelectedPilots = this.state.selectedPilots;
    this.setState({
      selectedPilot: autocompleteResult.pilot,
    })
    const selectedPilotFromState = this.state.selectedPilot;
    if (actualSelectedPilots.indexOf(selectedPilotFromState) < 0) {
      actualSelectedPilots.push(selectedPilotFromState)
      this.setState({
        selectedPilots: actualSelectedPilots,
        pilotsSearchInput: ' ',
      })
    }
  }

  handleUpdateFiles(files) {
    const { dispatch } = this.props;
    const { file } = this.props.fileUpload;
    dispatch(uploadFile(files[0], dispatch))
    if (file) {
      this.setState({
        file: file
      })
    }
  }

  handleUpdateFilesError(error, file) {
    this.setState({
      filesError: error
    })
  }

  currentDateTime() {
    const { params } = this.props;
    if (params.id) {
      const { dateTime } = this.props.missions.mission;
      return new Date(dateTime)
    } else return null;
  }

  parseAirplaneForSelect(airplane) {
    return airplane.airplaneModel.manufacturer.name + ' - ' +
      airplane.airplaneModel.name + ' - ' + airplane.subscriptionNumber;
  }

  missionToErrorText() {
    const { params } = this.props;
    if (! params.id && !this.state.selectedTo) {
      return 'Escolha a o destino'
    } else return null;
  }

  missionFromText() {
    const { params } = this.props;
    if(! params.id && !this.state.selectedFrom) {
      return 'Escolha a origem'
    } else return null;
  }

  editPilots() {
    const { missionPilots } = this.props.missions;
    const mappedMissionPilots = missionPilots.map((missionPilot) => {
      return missionPilot.pilot
    })
    this.setState({
      selectedPilots: mappedMissionPilots,
    })
  }

  editPassengers() {
    const { missionPassengers } = this.props.missions;
    const mappedMissionPassengers = missionPassengers.map((missionPassenger) => {
        return missionPassenger.passenger
    })
    this.setState({
      selectedPassengers: mappedMissionPassengers,
    })
  }

  render() {
    const chipsWrapper = { display: 'flex', flexWrap: 'wrap'}
    const { params } = this.props;
    const { mission, newMission, inserting, updating, updatedMission, missionPassengers, missionPilots } = this.props.missions;
    let isLoading = params.id && !mission;
    const showCurrentPassengers = params.id && missionPassengers;
    const showCurrentPilots = params.id && missionPilots;

    if (isLoading) {
      return <MissoesLoading />
    }
    return (
      <Container>
        <h1>Missões</h1>
        <Form onSubmit={this.submitData}>
              <DatePicker
                hintText="Data"
                floatingLabelText="Data*"
                fullWidth={true}
                name="date"
                defaultDate={params.id ? this.currentDateTime() : null}
                />
              <TimePicker
                hintText="Hora"
                floatingLabelText="Hora*"
                defaultTime={params.id ? this.currentDateTime() : null}
                format="24hr"
                fullWidth={true}
                name="time"
                />
              <Input
                label="Objetivo*"
                floatingLabel={true}
                required={true}
                name="reason"
                defaultValue={ params.id ? mission.reason : '' }
                />
              <Select name="airplane">
                {params.id ? <Option label={this.parseAirplaneForSelect(mission.airplane)} value={JSON.stringify(mission.airplane)} /> : null }
                {this.airplaneOptionsRender() }
              </Select>
                <AutoComplete
                  hintText="Origem"
                  floatingLabelText="Origem*"
                  dataSource={this.mappedAirports()}
                  onNewRequest={this.handleUpdateFrom}
                  searchText={ params.id ?  mission.missionFrom.acronym + ' - ' + mission.missionFrom.name : ''}
                  fullWidth={true}
                  errorText={params.id ? null : this.missionFromText()}
                  />
                <AutoComplete
                  hintText="Destino"
                  floatingLabelText="Destino*"
                  dataSource={this.mappedAirports()}
                  onNewRequest={this.handleUpdateTo}
                  searchText={ params.id ?  mission.missionTo.acronym + ' - ' + mission.missionTo.name : ''}
                  fullWidth={true}
                  errorText={params.id ? null : this.missionToErrorText()}
                  />
                <AutoComplete
                  hintText="Passageiro"
                  floatingLabelText="Passageiro*"
                  searchText={this.state.passengersSearchInput}
                  dataSource={this.mappedPassengers()}
                  onNewRequest={this.handleUpdatePassenger}
                  fullWidth={true}
                  errorText={this.state.selectedPilots.length < 0 ? 'Escolha ao menos um passageiro' : null}
                />
              <div style={chipsWrapper}>
                    {showCurrentPassengers ? this.renderCurrentPassengersForUpdate() :  null}
                    {showCurrentPassengers ? <a className="mui-btn mui-btn--raised" onClick={this.editPassengers.bind(this)}>Editar Passageiros</a> : null}
              </div>
              <div style={chipsWrapper}>
                { showCurrentPassengers ? <span>Novos passageiros</span> : null}
                { this.renderSelectedPassengers() }
              </div>
              <AutoComplete
                hintText="Piloto"
                floatingLabelText="Piloto*"
                searchText={this.state.pilotsSearchInput}
                dataSource={this.mappedPilots()}
                onNewRequest={this.handleUpdatePilot}
                fullWidth={true}
              />
              <div style={chipsWrapper}>
                  {showCurrentPilots ? this.renderCurrentPilotsForUpdate() : null}
                  { showCurrentPilots ? <a className="mui-btn mui-btn--raised" onClick={this.editPilots.bind(this)}>Editar Pilotos</a> : null}
              </div>
              <div style={chipsWrapper}>
                 { showCurrentPilots ?  <span>Novos pilotos</span> : null}
                 { this.renderSelectedPilots() }
              </div>
              <Files
                className="files-dropzone"
                onChange={this.handleUpdateFiles}
                onError={this.handleUpdateFilesError}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
                >
                <FlatButton label="Anexar.." />
              </Files>
              <Button variant="raised">Salvar</Button>
        </Form>
        { inserting ?
          <Formfeedback
            message={"Inserindo nova missão.."}
            duration={3000}
          /> : null}
        { newMission ?
          <Formfeedback
          message={"Nova missão agendada com sucesso"}
          duration={3000}
        />: null}
      </Container>
    )
  }

}
