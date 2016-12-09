import React from 'react';
import { connect } from 'react-redux';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Container from 'muicss/lib/react/container';
import TextField from 'material-ui/TextField';
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
      seatsNumber: null,
      subscriptionNumber: null,
    }
    this.submitData = this.submitData.bind(this);
    this.setSeatsNumber = this.setSeatsNumber.bind(this);
    this.isSeatsNumberEmpty = this.isSeatsNumberEmpty.bind(this);
  }

  //Dispatching everything before the component is mounted so it will avoid trouble loading the async call
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllAirplaneModels(dispatch));
  }

  submitData(event) {
    event.preventDefault();
    const { dispatch, airplane } = this.props;
    console.log(event.target)
    const newAirplane = {
      seatsNumber: event.target.seatsNumber.value,
      subscriptionNumber: event.target.subscriptionNumber.value,
      airplaneModel: event.target.airplaneModel.value,
    }
    if (airplane) {
      newAirplane.id = airplane.id
    }
    console.log(newAirplane)
    //dispatch(insertUpdateAirplane(newAirplane, dispatch))
  }


  airplaneModelsOptionsRender() {
    const { airplaneModels, fetching } = this.props.airplaneModels;
    if (! airplaneModels) {
      return <MissoesLoading />
    }
    return airplaneModels.map( (airplaneModel) => {
      const completeAirplaneModelName = airplaneModel.manufacturer.name + ' - ' + airplaneModel.name
      return <Option key={airplaneModel.id} value={airplaneModel} label={completeAirplaneModelName} />
    });
  }

  isSeatsNumberEmpty() {
    return this.state.seatsNumber === null;
  }
  setSeatsNumber(event, seatsNumber) {
    this.setState({ seatsNumber})
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
    const { newAirplane } = this.props.airplanes;
    const { airplane, dispatch } = this.props;
    return (
      <div>
        <Container>
          <h1>Aeronaves</h1>
          <Form onSubmit={this.submitData}>
              <Input label="Matrícula*" required={true} floatingLabel={true} name="subscriptionNumber"/>
              <TextField
                hintText="Numero de Assentos*"
                type="number"
                fullWidth={true}
                name="seatsNumber"
                defaultValue={ airplane ? airplane.seatsNumber : null }
                onChange={this.setSeatsNumber}
                errorText={this.isSeatsNumberEmpty() ? 'Número de assentos obrigatório' : null}
              />
              <Select name="airplaneModel">
                  {this.airplaneModelsOptionsRender()}
              </Select>
              <Button variant="raised">Salvar</Button>
          </Form>
        </Container>
      </div>
    )
  }

}
