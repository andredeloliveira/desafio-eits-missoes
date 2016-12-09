import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import Form from 'muicss/lib/react/form';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import Files from 'react-files';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
      selectedPilots: [],
      selectedPassengers: [],
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
    this.handleAddNewPassenger = this.handleAddNewPassenger.bind(this);
    this.handleAddNewPilot = this.handleAddNewPilot.bind(this);
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

  renderSelectedPassengers() {
    return this.state.selectedPassengers.map((passenger) => {
      return <span key={passenger.id}>{passenger.name}</span>
    })
  }

  renderSelectedPilots() {
    return this.state.selectedPilots.map((pilot) => {
      return <span key={pilot.id}>{pilot.name}</span>
    })
  }

  renderPassengersAutoComplete() {
    let passengersAutoComplete = [];
    for (let i = 0; i < this.state.numberAutoCompletePassengersToRender; i++) {
      passengersAutoComplete.push(
        <AutoComplete
          key={i}
          hintText="Passageiro"
          dataSource={this.mappedPassengers()}
          onNewRequest={this.handleUpdatePassenger}
          fullWidth={true}
        />
      )
    }
    return passengersAutoComplete;
  }

  renderPilotsAutoComplete() {
    let pilotsAutoComplete = [];
    for (let i = 0; i < this.state.numberAutoCompletePilotsToRender; i++) {
      pilotsAutoComplete.push(
        <AutoComplete
          key={i}
          hintText="Pilotos"
          dataSource={this.mappedPilots()}
          onNewRequest={this.handleUpdatePilot}
          fullWidth={true}
        />
      )
    }
    return pilotsAutoComplete;
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

  handleAddNewPassenger() {
    this.setState({
      numberAutoCompletePassengersToRender: this.state.numberAutoCompletePassengersToRender += 1,
    })
  }

  handleAddNewPilot() {
    this.setState({
      numberAutoCompletePilotsToRender: this.state.numberAutoCompletePilotsToRender += 1,
    })
  }

  handleUpdateFrom(autocompleteResult) {
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
    actualSelectedPassengers.push(this.state.selectedPassenger)
    this.setState({
      selectedPassengers: actualSelectedPassengers
    })
  }

  handleUpdatePilot(autocompleteResult) {
    let actualSelectedPilots = this.state.selectedPilots;
    this.setState({
      selectedPilot: autocompleteResult.pilot,
    })
    actualSelectedPilots.push(this.state.selectedPilot)
    this.setState({
      selectedPilots: actualSelectedPilots
    })
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
    const { mission } = this.props;
    return (
      <Container>
        <Form onSubmit={this.submitData}>
          <div>
            <div>
              <DatePicker
                hintText="Data"
                fullWidth={true}
                name="date"
                />
            </div>
            <div>
              <TimePicker
                hintText="Hora"
                format="24hr"
                fullWidth={true}
                name="time"
                />
            </div>
            <div>
              <TextField
                hintText="Objetivo"
                type="text"
                fullWidth={true}
                multiLine={true}
                name="reason"
                defaultValue={ mission ? mission.reason : null }
                />
            </div>
            <div>
              <Select>
                {this.airplaneOptionsRender() }
              </Select>
            </div>
              <div>
                <AutoComplete
                  hintText="Origem"
                  dataSource={this.mappedAirports()}
                  onNewRequest={this.handleUpdateFrom}
                  fullWidth={true}
                  />
              </div>
              <div>
                <AutoComplete
                  hintText="Destino"
                  dataSource={this.mappedAirports()}
                  onNewRequest={this.handleUpdateTo}
                  fullWidth={true}
                  />
              </div>
              <div>
                { this.renderPassengersAutoComplete() }
                <FloatingActionButton mini={true} onTouchTap={this.handleAddNewPassenger}>
                  <ContentAdd />
                </FloatingActionButton>
              </div>
              <div>
              { this.renderPilotsAutoComplete() }
              <FloatingActionButton mini={true} onTouchTap={this.handleAddNewPilot}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
            <div>
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
            </div>
          </div>
        </Form>
      </Container>
    )
  }

}
