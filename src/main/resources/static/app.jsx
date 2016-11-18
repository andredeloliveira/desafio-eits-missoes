var React = require('react');
var ReactDOM = require('react-dom');

export default class App extends React.Component {
  render() {
  	return (
  		<h1>Welcome to the missions app! The nicest one!</h1>
  	)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react')
)