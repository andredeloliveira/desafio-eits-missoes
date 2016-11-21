import React from 'react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';

export class MainComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { main } = this.props;
    return (
    <div>
      <Header />
        <div className="main">
          {main}
        </div>
      <Footer />
    </div>
    )
  }
}
