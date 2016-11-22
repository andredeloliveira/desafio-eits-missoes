import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

export class MissionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAirplane: null
    }
    this.handleSelectAirplaneChange = this.handleSelectAirplaneChange.bind(this);
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

  handleUpdatePilots(inputQuery) {
    console.log('input query', inputQuery);
  }

  handleUpdatePassengers(inputQuery) {
    console.log('input query', inputQuery)
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

    const passengersDataSource = [
      'Antonio',
      'Diego',
      'Thomas',
      'Hugo'
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
          <AutoComplete
            hintText="Pilotos"
            dataSource={pilotsDataSource}
            onUpdateInput={this.handleUpdatePilots}
            fullWidth={true}
          />
          <AutoComplete
            hintText="Passageiros"
            dataSource={passengersDataSource}
            onUpdateInput={this.handleUpdatePassengers}
            fullWidth={true}
          />
        </div>
      </form>
    )
  }

}
