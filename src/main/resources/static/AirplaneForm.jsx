import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { MissoesLoading } from './MissoesLoading.jsx';
import { findAllAirplaneModels } from './actions/airplaneModelsActions';
import { insertUpdateAirplane } from './actions/airplaneActions';

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
  }

  //Dispatching everything before the component is mounted so it will avoid trouble loading the async call
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllAirplaneModels(dispatch));
  }

  handleSelectAirplaneModelChange(event, index, airplaneModel) {
    this.setState({
      airplaneModel: airplaneModel
    })
  }

  airplaneModelsRender() {
    const { airplaneModels, fetching } = this.props.airplaneModels;
    //we chan change the key value to be the id...
    if (! airplaneModels) {
      console.log('loading')
      return <MissoesLoading />
    }
    return airplaneModels.map( (airplaneModel) => {
      const completeAirplaneModelName = airplaneModel.manufacturer.name + ' - ' + airplaneModel.name
      return <MenuItem key={airplaneModel.id} value={airplaneModel} primaryText={completeAirplaneModelName} />
    });
  }


  submitData(event) {
    const { dispatch } = this.props;
    event.preventDefault();
    const airplane = {
      seatsNumber: event.target.seatsNumber.value,
      subscriptionNumber: event.target.subscriptionNumber.value,
      airplaneModel: this.state.airplaneModel
    }
    dispatch(insertUpdateAirplane(airplane, dispatch))
    this.props.handleCloseDialog();
  }

  render() {
    const imageInput = {
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
    return (
      <div>
        <form onSubmit={this.submitData}>
            <TextField
              hintText="Ex: AAABBB-7777"
              floatingLabelText="Matricula"
              type="text"
              fullWidth={true}
              name="subscriptionNumber"
            />
            <TextField
              hintText="Ex: 200"
              floatingLabelText="Número de Assentos"
              type="number"
              fullWidth={true}
              name="seatsNumber"
              />
            <SelectField
              floatingLabelText="Modelo Aeronave"
              onChange={this.handleSelectAirplaneModelChange}
              value={this.state.airplaneModel}
              fullWidth={true}
              name="airplaneModel"
              >
            { this.airplaneModelsRender() }
            </SelectField>
            <FlatButton label="Salvar" labelPosition="before">
              <input type="submit" style={imageInput} />
            </FlatButton>
        </form>
      </div>
    )
  }

}
