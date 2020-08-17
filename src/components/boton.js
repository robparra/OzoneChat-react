import React, { Component } from 'react'

 export default class boton extends Component{
	constructor(props) {
		super(props);
	    this.chatButtom = this.chatButtom.bind(this)

	    this.state = {
	    	showContent : true
	    }
	}

	chatButtom(event){
		event.preventDefault()
		this.setState({
			showContent:!this.state.showContent
		})
	}

	rennder(){
		const {showContent} = this.state
		return(
			<div>
			<button onClick={this.chatButtom}>Chat</button>
			</div>
			);
	}
}

