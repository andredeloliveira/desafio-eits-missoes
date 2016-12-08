import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { MissoesLoading } from './MissoesLoading.jsx';
import { findAllAirplaneModels } from './actions/airplaneModelsActions';
import { insertUpdateAirplane } from './actions/airplaneActions';


//TODO: show actual value of airplane (when editing)..actually not showing at the moment
@connect((Store) => {
  return {
    airplaneModels: Store.airplaneModelsReducer,
    airplanes: Store.airplaneReducer
  }
})
export class AirplaneForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      airplaneModel: null,
      seatsNumber: null,
      subscriptionNumber: null,
    }
    this.handleSelectAirplaneModelChange = this.handleSelectAirplaneModelChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.renderActualAirplaneValue = this.renderActualAirplaneValue.bind(this);
  }

  //Dispatching everything before the component is mounted so it will avoid trouble loading the async call
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllAirplaneModels(dispatch));
  }

  submitData(event) {
    event.preventDefault();
    const { dispatch, airplane } = this.props;
    const newAirplane = {
      seatsNumber: event.target.seatsNumber.value,
      subscriptionNumber: event.target.subscriptionNumber.value,
      airplaneModel: this.state.airplaneModel ? this.state.airplaneModel : airplane.airplaneModel
    }
    if (airplane) {
      newAirplane.id = airplane.id
    }
    dispatch(insertUpdateAirplane(newAirplane, dispatch))
    this.props.handleCloseDialog();
  }

  handleSelectAirplaneModelChange(event, index, airplaneModel) {
    this.setState({
      airplaneModel: airplaneModel
    })
  }

  airplaneModelsRender() {
    const { airplaneModels, fetching } = this.props.airplaneModels;
    if (! airplaneModels) {
      return <MissoesLoading />
    }
    return airplaneModels.map( (airplaneModel) => {
      const completeAirplaneModelName = airplaneModel.manufacturer.name + ' - ' + airplaneModel.name
      return <MenuItem key={airplaneModel.id} value={airplaneModel} primaryText={completeAirplaneModelName} />
    });
  }


  //this was supposed to show the defaultValue for a select field... apparently it isn't implemented in the right way :/
  renderActualAirplaneValue() {
    const { airplane } = this.props;
    const currentAirplaneModel = airplane.airplaneModel.manufacturer.name + ' - ' + airplane.airplaneModel.name
    return <MenuItem  value={airplane.airplaneModel} primaryText={currentAirplaneModel} />
  }

  compon

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
    const { newAirplane } = this.props.airplanes;
    const { airplane, dispatch } = this.props;
    return (
      <div>
        <form onSubmit={this.submitData}>
            <TextField
              hintText="Ex: AAABBB-7777"
              floatingLabelText="Matricula"
              type="text"
              fullWidth={true}
              name="subscriptionNumber"
              defaultValue={airplane ? airplane.subscriptionNumber : null }
            />
            <TextField
              hintText="Ex: 200"
              floatingLabelText="Número de Assentos"
              type="number"
              fullWidth={true}
              name="seatsNumber"
              defaultValue={ airplane ? airplane.seatsNumber : null }
              />
            <SelectField
              floatingLabelText="Modelo Aeronave"
              onChange={this.handleSelectAirplaneModelChange}
              value={ this.state.airplaneModel }
              fullWidth={true}
              name="airplaneModel"
              >
              {this.airplaneModelsRender()}
            </SelectField>
            <FlatButton label="Salvar" labelPosition="before">
              <input type="submit" style={submitInput} />
            </FlatButton>
        </form>
      </div>
    )
  }

}
