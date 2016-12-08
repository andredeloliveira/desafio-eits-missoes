import React from 'react';
import { connect } from 'react-redux';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { Login } from './Login.jsx';

@connect((Store) => {
  return {
    login: Store.loginReducer,
  }
})
export class MainComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCurrentUserState() {
    const { currentUser } = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.setState({
        currentUser: currentUser,
      })
    }
  }

  render() {
    const { main } = this.props;
    const { currentUser } = this.props.login;
    //const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
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
