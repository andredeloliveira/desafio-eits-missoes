import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions/loginActions';
import Formfeedback from './Formfeedback.jsx';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

@connect((Store) => {
  return {
    login: Store.loginReducer
  }
})
export class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  renderError() {
    const { error } = this.props.login;
    const errorStyle = {
      fontSize: "2em",
      color: "#FF0000"
    }
    if (error) {
      return ( <span style={errorStyle}>{error}</span> )
    }
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
    return (
    <div>
      <Form onSubmit={this.submitLogin}>
        <Input label="E-mail*" type="email" floatingLabel={true} required={true} name="email" />
        <Input label="Senha*" type="password" floatingLabel={true} required={true} name="password"/>
        <Button variant="raised">Entrar</Button>
      </Form>
      {this.renderError()}
    </div>
    )
  }
}
