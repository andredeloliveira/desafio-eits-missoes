import { Router, Route, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import Store from './stores/Store';
import { Dashboard } from './Dashboard.jsx';
import { MainComponent } from './MainComponent.jsx';
import { Airplanes } from './Airplanes.jsx';
import { Users } from './Users.jsx';
import { Missions } from './Missions.jsx';
import { Login } from './Login.jsx';
import { AirplaneForm } from './AirplaneForm.jsx';

export default class App extends React.Component {

  constructor(props) {
  	super(props)
    injectTapEventPlugin();
  }

  render() {
    const { main } = this.props;

  	return (
  		<MuiThemeProvider>
        <Provider store={Store}>
  		      <MainComponent main={main} />
        </Provider>
  		</MuiThemeProvider>
  	)
  }
}


ReactDOM.render(
  <Router history={hashHistory}>
    <Route components={App}>
      <Route path="/" components={{ main: Dashboard}} />
      <Route path="/aeronaves" components={{main: Airplanes}} />
      <Route path="/missoes" components={{main: Missions}} />
      <Route path="/usuarios" components={{main: Users}} />
      <Route path="/aeronaves/novo" components={{main: AirplaneForm }} />
    </Route>
  </Router>,
  document.getElementById('react')
)
