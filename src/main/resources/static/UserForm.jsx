import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { insertUpdateUser } from './actions/userActions';

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
    this.handleSelectUserProfile = this.handleSelectUserProfile.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  submitData(event) {
    const { dispatch } = this.props;
    event.preventDefault();
    const newUser = {
      email: event.target.email.value,
      name: event.target.name.value,
      password: event.target.password.value,
      perfilAcesso: this.state.selectedUserProfile,
    }
    dispatch(insertUpdateUser(newUser, dispatch))
    this.props.handleCloseDialog()
  }

  userProfilesRender() {
    const userProfiles = [
      'ADMINISTRADOR',
      'PILOTO',
      'PASSAGEIRO'
    ]
    return userProfiles.map( (userProfile, index) => {
      return <MenuItem key={index} value={userProfile} primaryText={userProfile} />
    })
  }

  handleSelectUserProfile(event, index, profile) {
    this.setState({
      selectedUserProfile: profile
    })
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
    return (
      <form onSubmit={this.submitData}>
        <div>
          <TextField
            hintText="Nome"
            floatingLabelText="Nome"
            type="text"
            name="name"
            fullWidth={true}
          />
          <TextField
            hintText="E-mail"
            floatingLabelText="E-mail"
            type="email"
            name="email"
            fullWidth={true}
          />
          <TextField
            hintText="Senha"
            floatingLabelText="Senha"
            type="password"
            name="password"
            fullWidth={true}
          />
          <SelectField
            floatingLabelText="Perfil de Acesso"
            onChange={this.handleSelectUserProfile}
            value={this.state.selectedUserProfile}
            name="profile"
            fullWidth={true}
            >
            { this.userProfilesRender() }
          </SelectField>
          <FlatButton label="Salvar" labelPosition="before">
            <input type="submit" style={submitInput} />
          </FlatButton>
        </div>
      </form>
    )
  }

}
