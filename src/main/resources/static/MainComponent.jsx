import React from 'react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';


export class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: sessionStorage.getItem('currentUser')
    }
  }


  render() {
    const { main } = this.props;
    console.log(this.state)
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
