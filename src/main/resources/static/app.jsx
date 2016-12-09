import { Router, Route, hashHistory, Match } from 'react-router';
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
import { UserForm } from './UserForm.jsx';
import { MissionForm } from './MissionForm.jsx';

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
      <Route path="/aeronaves/update/:id" components={{main: AirplaneForm}} />
      <Route path="/usuarios/update/:id" components={{main: UserForm}} />
      <Route path="/missoes/update/:id" components={{main: MissionForm}} />
      <Route path="/usuarios/novo" components={{main: UserForm }} />
      <Route path="/missoes/novo" components={{main: MissionForm }} />

    </Route>
  </Router>,
  document.getElementById('react')
)
