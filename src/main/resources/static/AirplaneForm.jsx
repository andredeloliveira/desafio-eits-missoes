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
import { Formfeedback } from './Formfeedback.jsx';
import { findAllAirplaneModels } from './actions/airplaneModelsActions';
import { insertAirplane, findAirplaneById, updateAirplane } from './actions/airplaneActions';


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

  }

  //Dispatching everything before the component is mounted so it will avoid trouble loading the async call
  componentWillMount() {
    const { dispatch, params } = this.props;
    if (params.id) {
      dispatch(findAirplaneById(params.id, dispatch))
    }
    dispatch(findAllAirplaneModels(dispatch));
  }

  submitData(event) {
    event.preventDefault();
    const { dispatch, params } = this.props;
    const { airplane } = this.props.airplanes;
    const updatingCondition = airplane && params.id
    const newAirplane = {
      seatsNumber: event.target.seatsNumber.value,
      subscriptionNumber: event.target.subscriptionNumber.value,
      airplaneModel: JSON.parse(event.target.airplaneModel.value),
    }
    if (updatingCondition) {
      newAirplane.id = airplane.id
      console.log(newAirplane)
      dispatch(updateAirplane(newAirplane, dispatch))
    }
    dispatch(insertAirplane(newAirplane, dispatch))
  }


  airplaneModelsOptionsRender() {
    const { airplaneModels, fetching } = this.props.airplaneModels;
    if (! airplaneModels) {
      return <MissoesLoading />
    }
    return airplaneModels.map( (airplaneModel) => {
      const completeAirplaneModelName = airplaneModel.manufacturer.name + ' - ' + airplaneModel.name
      const airplaneModelValue = JSON.stringify(airplaneModel);
      return <option key={airplaneModel.id} value={airplaneModelValue}  label={completeAirplaneModelName} />
    });
  }

  parseAirplaneForSelect(airplane) {
    return airplane.airplaneModel.manufacturer.name + ' - ' + airplane.airplaneModel.name;
  }

  render() {

    const { airplane, newAirplane, inserting, updating, updatedAirplane } = this.props.airplanes;
    const { dispatch, params } = this.props;
    const isLoading = params.id && !airplane;
    const showFeedBackUpdate = params.id && updatedAirplane;
    if (isLoading) {
      return <MissoesLoading />
    }
    return (
      <div>
        <Container>
          <h1>Aeronaves</h1>
          <Form onSubmit={this.submitData}>
              <Input
                label="Matrícula*"
                required={true}
                floatingLabel={true}
                name="subscriptionNumber"
                defaultValue={!isLoading ? airplane.subscriptionNumber : ''}
              />
              <TextField
                hintText="Numero de Assentos*"
                type="number"
                fullWidth={true}
                name="seatsNumber"
                defaultValue={!isLoading ? airplane.seatsNumber : '' }
                onChange={this.setSeatsNumber}
              />
            <div className="mui-select">
                <select name="airplaneModel">
                  {!isLoading ? <option label={this.parseAirplaneForSelect(airplane)} value={JSON.stringify(airplane.airplaneModel)}/>
                  :null}
                  {this.airplaneModelsOptionsRender()}
                </select>
              </div>
              <Button variant="raised">Salvar</Button>
          </Form>
          {inserting ?
          <Formfeedback
            message={"Inserindo nova aeronave.."}
            duration={3000}
          /> :null}
          {updating ?
          <Formfeedback
            message={"Atualizando nova aeronave.."}
            duration={3000}
          /> :null}
          {newAirplane ?
          <Formfeedback
            message={"Aeronave" + newAirplane.subscriptionNumber + "inserida com sucesso"}
            duration={3000}
          /> :null}
          {updatedAirplane ?
          <Formfeedback
            message={"Aeronave" + updatedAirplane.subscriptionNumber + "atualizada com sucesso"}
            duration={3000}
          /> :null}
        </Container>
      </div>
    )
  }

}
