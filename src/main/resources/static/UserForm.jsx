/*
  Form for insert actions performed on User 
*/
import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Container from 'muicss/lib/react/container';
import { MissoesLoading } from './MissoesLoading.jsx';
import { connect } from 'react-redux';
import { Formfeedback } from './Formfeedback.jsx';
import { insertUser, findUserById, updateUser } from './actions/userActions';

@connect((Store) => {
  return {
    users: Store.userReducer
  }
})
export class UserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedUserProfile: null
    }
    this.submitData = this.submitData.bind(this);
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    if (params.id) {
      dispatch(findUserById(params.id, dispatch))
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: 'SET_INITIAL_STATE' })
  }

  submitData(event) {
    const { dispatch, params } = this.props;
    const { user } = this.props.users;
    event.preventDefault();
    const passwordValue = event.target.password.value;
    const newUser = {
      email: event.target.email.value,
      name: event.target.name.value,
      password: passwordValue === 'anyvalue' ? user.password : passwordValue,
      perfilAcesso: event.target.perfilAcesso.value,
    }
    if (user) {
      newUser.id = user.id;
      dispatch(updateUser(newUser, dispatch))
    } else {
      dispatch(insertUser(newUser, dispatch))
    }
    if (! user) {
      event.target.email.value = '';
      event.target.name.value = '';
      event.target.password.value = '';
      event.target.perfilAcesso.value = '';
    }
  }

  userProfilesRender() {
    const userProfiles = [
      'ADMINISTRADOR',
      'PILOTO',
      'PASSAGEIRO'
    ]
    return userProfiles.map( (userProfile, index) => {
      return <option key={index} value={userProfile} label={userProfile} />
    })
  }

  render() {
    const errorStyle = {
      fontSize: "2em",
      color: "#FF0000"
    }
    const { params } = this.props;
    let { user } = this.props.users;
    const {  newUser, inserting, updating, updatedUser, error } = this.props.users;
    const isLoading = params.id && !user;
    const showFeedBackUpdate = params.id && updatedUser;
    if (!params.id) {
      user = null;
    }
    if (params.id && !user) {
      return <MissoesLoading />
    }
    return (
      <div>
        <Container>
          <h1>Usuários</h1>
          <Form onSubmit={this.submitData}>
            <Input
              label="Nome*"
              required={true}
              floatingLabel={true}
              name="name"
              defaultValue={user ? user.name : ''}
              />
            <Input label="E-mail*" required={true} floatingLabel={true} name="email" type="email" defaultValue={user ? user.email : ''} />
            <Input label="Senha*" required={true} floatingLabel={true} name="password" type="password" defaultValue={user ? 'anyvalue' : ''}/>
            <div className="mui-select">
              <select name="perfilAcesso" defaultValue={user ? user.perfilAcesso : ''}>
                { this.userProfilesRender() }
              </select>
            </div>
            <div style={errorStyle}>
              {error ? <span>{error}</span> : null}
            </div>
            <Button variant="raised">Salvar</Button>
          </Form>
          {inserting ?
            <Formfeedback
              message={"Inserindo novo usuário.."}
              duration={3000}
            /> :  null }
          {updating ?
            <Formfeedback
              message={"Atualizando usuário.."}
              duration={3000}
            /> :  null }
          {newUser ?
            <Formfeedback
              message={"Usuário " + newUser.name + " inserido"}
              duration={3000}
            /> :  null }
          {showFeedBackUpdate ?
            <Formfeedback
              message={"Usuário " + updatedUser.name + " atualizado"}
              duration={3000}
            /> :  null }
        </Container>
      </div>
    )
  }

}
