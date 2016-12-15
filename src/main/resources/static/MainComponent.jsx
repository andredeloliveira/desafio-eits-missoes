import React from 'react';
import { connect } from 'react-redux';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { Login } from './Login.jsx';
import { getCurrentUser } from './actions/loginActions';

@connect((Store) => {
  return {
    login: Store.loginReducer,
  }
})
export class MainComponent extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { main } = this.props;
    const { currentUser } = this.props.login;
    return (
    <div>
      <Header />
        <div className="main">
          {currentUser ? main : <Login />}
        </div>
      <Footer />
    </div>
    )
  }
}
