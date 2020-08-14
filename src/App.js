import React, { Component } from 'react';
import Layout from './components/Layout'
import './index.css';

class App extends Component {

	constructor(){
		super()
		this.state={
			showMe:true
		}
	}
	operation(){
	showMe:!this.state.showMe
}
  render() {
    return (
        
        
        	this.state.showMe?
        	<Layout />
        	:null
        
       
    );
  }
}

export default App;
