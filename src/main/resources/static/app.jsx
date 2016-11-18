import { Router, Route, hashHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');
import $  from 'jquery';
import 'materialize-css';
import { About } from './About.jsx';

export default class App extends React.Component {

  constructor(props) {
  	super(props)
  }
  
  optionsRender() {
    let collection = ['1','2','3','4','5','6']
    return collection.map((collectionItem, index) => {
    	return (
    		<option key={index} value={collectionItem}>{collectionItem}</option>
    	)
    });
  }
  
  
  render() {
	
	
  	return (
  		<div>
			<h1>YAY root app</h1>
			<select>
				{this.optionsRender()}
			</select>
  		</div>
  	)
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
  </Router>,
  document.getElementById('react')
)
