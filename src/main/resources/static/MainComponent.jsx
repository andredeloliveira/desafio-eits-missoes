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
    this.state = {
      currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
    }
    this.handleCurrentUserState = this.handleCurrentUserState.bind(this);
  }

  handleCurrentUserState() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.setState({
        currentUser: currentUser,
      })
    }
  }

  render() {
    const { main, currentUser } = this.props;
    this.handleCurrentUserState();
    return (
    <div>
      <Header />
        <div className="main">
          {this.state.currentUser ? main : <Login />}
        </div>
      <Footer />
    </div>
    )
  }
}
