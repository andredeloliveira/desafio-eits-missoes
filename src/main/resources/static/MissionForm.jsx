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

//TODO(andredeloliveira): consider refactoring this massive component and splitting into smaller components

@connect((Store) => {
  return {
    airplanes: Store.airplaneReducer,
    users: Store.userReducer,
  }
})
export class MissionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAirplane: null
    }
    this.handleSelectAirplaneChange = this.handleSelectAirplaneChange.bind(this);
    this.airplanesRender = this.airplanesRender.bind(this);
    this.mappedPassengers = this.mappedPassengers.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllAirplanes(dispatch))
    dispatch(findAllPilots(dispatch))
    dispatch(findAllPassengers(dispatch))
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
          passenger: passenger
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

  handleUpdatePassengers(inputQuery) {
    console.log(inputQuery)
  }

  handleUpdatePilots(inputQuery) {
    console.log(inputQuery);
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
    const pilotsDataSource = [
      'Mariana',
      'Natália',
      'Luíza',
      'Andrea'
    ]
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
              dataSource={pilotsDataSource}
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
