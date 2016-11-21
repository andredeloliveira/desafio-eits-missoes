import { Router, Route, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Dashboard } from './Dashboard.jsx';
import { MainComponent } from './MainComponent.jsx';
import { Airplanes } from './Airplanes.jsx';

export default class App extends React.Component {

  constructor(props) {
  	super(props)
    injectTapEventPlugin();
  }

  render() {
    const { main } = this.props;

  	return (
  		<MuiThemeProvider>
  		  <MainComponent main={main}/>
  		</MuiThemeProvider>
  	)
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route components={App}>
      <Route path="/" components={{ main: Dashboard}} />
      <Route path="/aeronaves" components={{main: Airplanes}} />
    </Route>
  </Router>,
  document.getElementById('react')
)
