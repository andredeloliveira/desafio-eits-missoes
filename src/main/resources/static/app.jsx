import { Router, Route, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { About } from './About.jsx';
import { Missions } from './Missions.jsx';

export default class App extends React.Component {

  constructor(props) {
  	super(props)
    injectTapEventPlugin();
  }

  render() {
    const { main } = this.props;
  	return (
  		<MuiThemeProvider>
  		  <Missions main={main}/>
  		</MuiThemeProvider>
  	)
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route components={App}>
      <Route path="/" components={{ main: About}} />
    </Route>
  </Router>,
  document.getElementById('react')
)
