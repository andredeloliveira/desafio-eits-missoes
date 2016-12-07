import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { login } from './actions/loginActions';

@connect((Store) => {
  return {
    login: Store.loginReducer
  }
})
export class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    }
    dispatch(login(user, dispatch));
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
      <form onSubmit={this.submitLogin}>
        <TextField
          hintText="exemplo@dominio.com"
          floatingLabelText="E-mail"
          type="email"
          fullWidth={true}
          name="email"
        />
      <TextField
        hintText="Senha"
        floatingLabelText="Senha"
        type="password"
        name="password"
        fullWidth={true}
      />
    <div>
      <FlatButton label="Entrar">
        <input type="submit" style={submitInput} />
      </FlatButton>
    </div>
      </form>
    )
  }
}
