import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
  }

  submitData(event) {
    event.prevenDefault();
    const newUser = {
      email: event.target.email.value,
      name: event.target.name.value,
      password: event.target.password.value,
      profile: event.target.profile.value,
    }
  }

  userProfilesRender() {
    const userProfiles = [
      'Administrador',
      'Piloto',
      'Passageiro'
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
        </div>
      </form>
    )
  }

}
