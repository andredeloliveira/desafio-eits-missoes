import React from 'react';
import { LoginForm } from './LoginForm.jsx';
export class Login extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const mainBlockStyle = {
      display: "block",
      margin: "0 auto",
    }
    return(
      <div className="onerow" style={mainBlockStyle}>
        <div className="col6">
          <div>
            <h1>Entrar</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    )
  }
}
