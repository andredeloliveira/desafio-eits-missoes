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
import { insertMission, findMissionById } from './actions/missionActions';
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
    this.submitData = this.submitData.bind(this);
    this.currentTime = this.currentTime.bind(this);
    this.currentDate = this.currentDate.bind(this);
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    if (params.id) {
      dispatch(findMissionById(params.id, dispatch))
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

  renderSelectedPassengers() {
    const chipStyle = { margin: 4}
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

  renderSelectedPilots() {
    const chipStyle = { margin: 4}
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
    const { dispatch } = this.props;
    const { file } = this.props.fileUpload;
    //Sometimes the user is not present in the Redux Store, so we get it from the sessionStorage variable ;), which is still valid
    const currentUser = this.props.auth.currentUser;
    const mission = {
      mission: {
        dateTime: event.target.date.value + ' ' + event.target.time.value,
        missionTo: this.state.selectedTo,
        missionFrom: this.state.selectedFrom,
        airplane: JSON.parse(event.target.airplane.value),
        reason: event.target.reason.value,
        //Will have to have it null and then pass it as a MultiPartFile..
        attachedFile: null,
      },
      planner: currentUser,
      passengers: this.state.selectedPassengers,
      pilots: this.state.selectedPilots,
    }
    dispatch(insertMission(mission, currentUser, dispatch))
    //cleaning all fields
    event.target.date.value = '';
    event.target.time.value = '';
    event.target.airplane.value = '';
    event.target.reason.value = '';
    this.setState({
      selectedPassengers: [],
      selectedPilots: [],
      pilotsSearchInput: ' ',
      passengersSearchInput: ' ',
      selectedTo: null,
      selectedFrom: null,
    })
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

  currentTime() {
    const { dateTime } = this.props.mission;
    return new Date(dateTime.split(' ')[1])
  }

  //There is a bug in the component :(
  currentDate() {
    const { dateTime } = this.props.mission;
    return new Date(dateTime)
  }

  parseAirplaneForSelect(airplane) {
    return airplane.airplaneModel.manufacturer.name + ' - ' +
      airplane.airplaneModel.name + ' - ' + airplane.subscriptionNumber;
  }

  render() {
    const chipsWrapper = { display: 'flex', flexWrap: 'wrap'}
    const { params } = this.props;
    const { mission, newMission, inserting, updating, updatedMission } = this.props.missions;
    let isLoading = params.id && !mission;
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
                />
              <TimePicker
                hintText="Hora"
                floatingLabelText="Hora*"
                format="24hr"
                fullWidth={true}
                name="time"
                />
              <Input
                label="Objetivo*"
                floatingLabel={true}
                required={true}
                name="reason"
                defaultValue={ mission ? mission.reason : '' }
                />
              <Select name="airplane">
                {mission ? <Option label={this.parseAirplaneForSelect(mission.airplane)} value={JSON.stringify(mission.airplane)} /> : null }
                {this.airplaneOptionsRender() }
              </Select>
                <AutoComplete
                  hintText="Origem"
                  floatingLabelText="Origem*"
                  dataSource={this.mappedAirports()}
                  onNewRequest={this.handleUpdateFrom}
                  fullWidth={true}
                  errorText={!this.state.selectedFrom ? 'Escolha a origem' : null}
                  />
                <AutoComplete
                  hintText="Destino"
                  floatingLabelText="Destino*"
                  dataSource={this.mappedAirports()}
                  onNewRequest={this.handleUpdateTo}
                  fullWidth={true}
                  errorText={!this.state.selectedTo ? 'Escolha o destino' :  null}
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
