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
import { MissionPassengers } from './MissionPassengers.jsx';
import { MissionPilots } from './MissionPilots.jsx';
import { findAllAirplanes } from './actions/airplaneActions';
import { findAllPilots, findAllPassengers } from './actions/userActions';


@connect((Store) => {
  return {
    airplanes: Store.airplanesReducer,
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

  airplanesRender() {
    const airplanes = [
      'A380 - AJAJAJAJ',
      'A880 - KKJJJKK',
      '777 - JJIIUUYY'
    ]
    return airplanes.map( (airplane, index) => {
      return <MenuItem key={index} value={airplane} primaryText={airplane} />
    })
  }
  handleUpdateInputFrom(inputQuery) {
    console.log('input query', inputQuery)
  }

  handleUpdateInputTo(inputQuery) {
    console.log('input query', inputQuery)
  }

  onFilesChange(files) {
    console.log('here are the files', files);
  }

  onFilesError(error, file) {
    console.log('error code ', error.code, ':', error.message)
  }

  render() {
    console.log(this.props);
    const airportDataSource = [
      'IGU - Foz do Iguaçu',
      'GRU - Guarulhos',
      'GIG - Galeão'
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
            { this.airplanesRender() }
          </SelectField>
          <AutoComplete
            hintText="Origem"
            dataSource={airportDataSource}
            onUpdateInput={this.handleUpdateInputFrom}
            fullWidth={true}
          />
          <AutoComplete
            hintText="Destino"
            dataSource={airportDataSource}
            onUpdateInput={this.handleUpdateInputTo}
            fullWidth={true}
          />
          <MissionPilots />
          <MissionPassengers />
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
