import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export class AirplaneForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAirplaneModel: null
    }
    this.handleSelectAirplaneChange = this.handleSelectAirplaneChange.bind(this);
  }

  handleSelectAirplaneChange(event, index, airplaneModel) {
    this.setState({
      selectedAirplaneModel: airplaneModel
    })
  }

  airplaneModelsRender() {
    //substitute this for a real thing
    const airplaneModels = [
      'A380',
      '777',
      '537',
    ]
    //we chan change the key value to be the id...
    return airplaneModels.map( (airplaneModel, index) => {
      return <MenuItem key={index} value={airplaneModel} primaryText={airplaneModel} />
    });
  }

  submitData(event) {
    event.prevenDefault();
    console.log('data was sent to the server')
  }

  render() {
    return (
      <form onSubmit={this.submitData}>
        <div>
          <TextField
            hintText="Hint Text"
            floatingLabelText="Matricula"
            type="text"
            fullWidth="true"
          />
        </div>
        <div>
          <TextField
            hintText="Hint Text"
            floatingLabelText="Número de Assentos"
            type="number"
            fullWidth="true"
            />
        </div>
        <div>
          <SelectField
            floatingLabelText="Modelo Aeronave"
            onChange={this.handleSelectAirplaneChange}
            value={this.state.selectedAirplaneModel}
            fullWidth="true"
            >
            { this.airplaneModelsRender() }
          </SelectField>
        </div>
      </form>
    )
  }

}
