import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
    console.log('data was sent')
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
            fullWidth={true}
          />
          <TextField
            hintText="E-mail"
            floatingLabelText="E-mail"
            type="email"
            fullWidth={true}
          />
          <TextField
            hintText="Senha"
            floatingLabelText="Senha"
            type="password"
            fullWidth={true}
          />
          <SelectField
            floatingLabelText="Perfil de Acesso"
            onChange={this.handleSelectUserProfile}
            value={this.state.selectedUserProfile}
            fullWidth={true}
            >
            { this.userProfilesRender() }
          </SelectField>
        </div>
      </form>
    )
  }

}
