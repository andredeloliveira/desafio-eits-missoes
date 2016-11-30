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
      selectedPilot: null,
      selectedPassenger: null,
    }
    this.handleSelectAirplaneChange = this.handleSelectAirplaneChange.bind(this);
    this.handleUpdatePassengers = this.handleUpdatePassengers.bind(this);
    this.handleUpdatePilots = this.handleUpdatePilots.bind(this);
    this.airplanesRender = this.airplanesRender.bind(this);
    this.mappedPassengers = this.mappedPassengers.bind(this);
    this.mappedPilots = this.mappedPilots.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllAirplanes(dispatch))
    dispatch(findAllPilots(dispatch))
    dispatch(findAllPassengers(dispatch))
    dispatch(findAllAirports(dispatch))
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

  handleUpdateInputFrom(inputQuery) {
    console.log('input query', inputQuery)
  }

  handleUpdateInputTo(inputQuery) {
    console.log('input query', inputQuery)
  }

  handleUpdatePassengers(autocompleteResult) {
    this.setState({
      selectedPassenger: autocompleteResult.passenger,
    })
  }

  handleUpdatePilots(autocompleteResult) {
    this.setState({
      selectedPilot: autocompleteResult.pilot,
    })
  }

  onFilesChange(files) {
    console.log('here are the files', files);
  }

  onFilesError(error, file) {
    console.log('error code ', error.code, ':', error.message)
  }

  render() {
    const airportDataSource = [
      'IGU - Foz do Iguaçu',
      'GRU - Guarulhos',
      'GIG - Galeão'
    ]
    console.log(this.state)
    return (
      <form onSubmit={this.submitData}>
        <div>
          <DatePicker hintText="Data" fullWidth={true} />
          <TimePicker hintText="Hora" format="24hr" fullWidth={true} />
          <TextField
            hintText="Objetivo"
            floatingLabelText="Objetivo"
            type="text"
            fullWidth={true}
            multiLine={true}
          />
            <SelectField
              floatingLabelText="Aeronave"
              onChange={this.handleSelectAirplaneChange}
              value={this.state.selectedAirplane}
              fullWidth={true}
            >
              {this.airplanesRender() }
            </SelectField>
          <AutoComplete
            hintText="Origem"
            dataSource={airportDataSource}
            onNewRequest={this.handleUpdateInputFrom}
            fullWidth={true}
          />
          <AutoComplete
            hintText="Destino"
            dataSource={airportDataSource}
            onNewRequest={this.handleUpdateInputTo}
            fullWidth={true}
          />
          <div>
            <AutoComplete
              hintText="Passageiros"
              dataSource={this.mappedPassengers()}
              onNewRequest={this.handleUpdatePassengers}
              fullWidth={true}
              />
            <FloatingActionButton mini={true} >
              <ContentAdd />
            </FloatingActionButton>
          </div>
          <div>
            <AutoComplete
              hintText="Pilotos"
              dataSource={this.mappedPilots()}
              onNewRequest={this.handleUpdatePilots}
              fullWidth={true}
              />
            <FloatingActionButton mini={true} >
              <ContentAdd />
            </FloatingActionButton>
          </div>
          <Files
            className="files-dropzone"
            onChange={this.onFilesChange}
            onError={this.onFilesError}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
          >
            <FlatButton label="Anexar.." />
          </Files>
        </div>
      </form>
    )
  }

}
