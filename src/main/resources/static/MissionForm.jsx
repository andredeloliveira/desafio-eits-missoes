import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Form from 'muicss/lib/react/form';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import Files from 'react-files';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove'
import Container from 'muicss/lib/react/container';
import { MissoesLoading } from './MissoesLoading.jsx';
import { MissionPassengers } from './MissionPassengers.jsx';
import { MissionPilots } from './MissionPilots.jsx';
import { findAllAirplanes } from './actions/airplaneActions';
import { findAllPilots, findAllPassengers } from './actions/userActions';
import { findAllAirports } from './actions/airportActions';
import { insertUpdateMission } from './actions/missionActions';
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
      numberAutoCompletePassengersToRender: 1,
      numberAutoCompletePilotsToRender: 1,
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
    const { dispatch } = this.props;
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
        return <Option key={index} value={airplane} label={airplaneText} />
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
    const currentUser = this.props.auth.currentUser || JSON.parse(sessionStorage.getItem('currentUser'));
    const mission = {
      mission: {
        dateTime: event.target.date.value + ' ' + event.target.time.value,
        missionTo: this.state.selectedTo,
        missionFrom: this.state.selectedFrom,
        airplane: this.state.selectedAirplane,
        reason: event.target.reason.value,
        //Will have to have it null and then pass it as a MultiPartFile..
        attachedFile: null,
      },
      planner: currentUser,
      passengers: this.state.selectedPassengers,
      pilots: this.state.selectedPilots,
    }
    dispatch(insertUpdateMission(mission, currentUser, dispatch))
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
        passengersSearchInput: '',
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
        pilotsSearchInput: '',
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

  render() {
    const submitInput = {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
    }
    const chipsWrapper = { display: 'flex', flexWrap: 'wrap'}
    const { mission } = this.props;
    return (
      <Container>
        <Form onSubmit={this.submitData}>
              <DatePicker
                hintText="Data"
                fullWidth={true}
                name="date"
                />
              <TimePicker
                hintText="Hora"
                format="24hr"
                fullWidth={true}
                name="time"
                />
              <TextField
                hintText="Objetivo"
                type="text"
                fullWidth={true}
                multiLine={true}
                name="reason"
                defaultValue={ mission ? mission.reason : null }
                />
              <Select>
                {this.airplaneOptionsRender() }
              </Select>
                <AutoComplete
                  hintText="Origem"
                  dataSource={this.mappedAirports()}
                  onNewRequest={this.handleUpdateFrom}
                  fullWidth={true}
                  />
                <AutoComplete
                  hintText="Destino"
                  dataSource={this.mappedAirports()}
                  onNewRequest={this.handleUpdateTo}
                  fullWidth={true}
                  />
                <AutoComplete
                  hintText="Passageiro"
                  searchText={this.state.passengersSearchInput}
                  dataSource={this.mappedPassengers()}
                  onNewRequest={this.handleUpdatePassenger}
                  fullWidth={true}
                />
              <div style={chipsWrapper}>
                  { this.renderSelectedPassengers() }
                </div>
              <AutoComplete
                hintText="Pilotos"
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
              <FlatButton label="Salvar" labelPosition="before">
                <input type="submit" style={submitInput} />
              </FlatButton>
        </Form>
      </Container>
    )
  }

}
