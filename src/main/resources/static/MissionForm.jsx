import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import Files from 'react-files';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { MissoesLoading } from './MissoesLoading.jsx';
import { MissionPassengers } from './MissionPassengers.jsx';
import { MissionPilots } from './MissionPilots.jsx';
import { findAllAirplanes } from './actions/airplaneActions';
import { findAllPilots, findAllPassengers } from './actions/userActions';
import { findAllAirports } from './actions/airportActions';


//TODO(andredeloliveira): consider refactoring this massive component and splitting into smaller components
@connect((Store) => {
  return {
    airplanes: Store.airplaneReducer,
    users: Store.userReducer,
    airports: Store.airportReducer,
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
      selectedPilot: null,
      selectedTo: null,
      selectedFrom: null,
      files: null,
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
    this.airplanesRender = this.airplanesRender.bind(this);
    this.mappedPassengers = this.mappedPassengers.bind(this);
    this.mappedPilots = this.mappedPilots.bind(this);
    this.mappedAirports = this.mappedAirports.bind(this);
    this.renderSelectedPassengers = this.renderSelectedPassengers.bind(this);
    this.renderSelectedPilots = this.renderSelectedPilots.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllAirplanes(dispatch))
    dispatch(findAllPilots(dispatch))
    dispatch(findAllPassengers(dispatch))
    dispatch(findAllAirports(dispatch))
  }


  //TODO(andredeloliveira): Ask how exactly it has to show
  airplanesRender() {
    const { airplanes } = this.props.airplanes;
    if (airplanes) {
      return airplanes.map( (airplane, index) => {
        const airplaneText = airplane.airplaneModel.manufacturer.name +
        ' ' + airplane.airplaneModel.name +
        ' - ' + airplane.subscriptionNumber;
        return <MenuItem key={index} value={airplane} primaryText={airplaneText} />
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

  handleSelectAirplaneChange(event, index, airplane) {
    this.setState({
      selectedAirplane: airplane
    })
  }
  submitData(event) {
    event.prevenDefault();
    console.log('data was sent')
  }

  handleAddNewPassenger() {
    console.log('adding new passenger')
  }

  handleAddNewPilot() {
    console.log('adding new pilot')
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
    if (actualSelectedPassengers.length === 0) {
      actualSelectedPassengers.push(this.state.selectedPassenger)
      this.setState({
        selectedPassengers: actualSelectedPassengers
      })
    }
  }

  handleUpdatePilot(autocompleteResult) {
    let actualSelectedPilots = this.state.selectedPilots;
    this.setState({
      selectedPilot: autocompleteResult.pilot,
    })
    if (actualSelectedPilots.length === 0) {
      actualSelectedPilots.push(this.state.selectedPilot)
      this.setState({
        selectedPilots: actualSelectedPilots
      })
    }
  }

  handleUpdateFiles(files) {
    this.setState({
      files: files
    })
  }

  handleUpdateFilesError(error, file) {
    this.setState({
      filesError: error
    })
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.submitData}>
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
              />
          </div>
          <div>
            <SelectField
              hintText="Aeronave"
              onChange={this.handleSelectAirplaneChange}
              value={this.state.selectedAirplane}
              fullWidth={true}
              >
              {this.airplanesRender() }
            </SelectField>
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
              <AutoComplete
                hintText="Passageiros"
                dataSource={this.mappedPassengers()}
                onNewRequest={this.handleUpdatePassenger}
                fullWidth={true}
                />
              <FloatingActionButton mini={true} onTouchTap={this.handleAddNewPassenger}>
                <ContentAdd />
              </FloatingActionButton>
              <div>
                { this.renderSelectedPassengers() }
              </div>
            </div>
            <div>
            <AutoComplete
              hintText="Pilotos"
              dataSource={this.mappedPilots()}
              onNewRequest={this.handleUpdatePilot}
              fullWidth={true}
              />
            <FloatingActionButton mini={true} onTouchTap={this.handleAddNewPilot}>
              <ContentAdd />
            </FloatingActionButton>
            <div>
              { this.renderSelectedPilots() }
            </div>
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
          </div>
        </div>
      </form>
    )
  }

}
