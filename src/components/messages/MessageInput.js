import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios'
import MdFileUpload from 'react-icons/lib/md/file-upload'

export default class MessageInput extends Component {
	
	constructor(props) {
	  super(props);
	  this.ChooseImage=this.ChooseImage.bind(this)
	
	  this.state = {
	  	message:"",
	  	isTyping:false
	  };

	}
	
	handleSubmit = (e)=>{
		e.preventDefault()
		this.sendMessage()
		this.setState({message:""})
	}

	sendMessage = ()=>{
		this.props.sendMessage(this.state.message)

	}

	componentWillUnmount() {
	  this.stopCheckingTyping()
	}

	sendTyping = ()=>{
		this.lastUpdateTime = Date.now()
		if(!this.state.isTyping){
			this.setState({isTyping:true})
			this.props.sendTyping(true)
			this.startCheckingTyping()
		}
	}

	/*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
	*/
	startCheckingTyping = ()=>{
		this.typingInterval = setInterval(()=>{
			if((Date.now() - this.lastUpdateTime) > 300){
				this.setState({isTyping:false})
				this.stopCheckingTyping()
			}
		}, 300)
	}
	
	/*
	*	stopCheckingTyping
	*	Start the interval from checking if the user is typing.
	*/
	stopCheckingTyping = ()=>{
		if(this.typingInterval){
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
	}

	ChooseImage=(event)=>{
		 document.getElementById('imageFile').click();
		 //console.log(event.target.files[0])
	}

	SendImage=(event)=>{
		var file = event.target.files[0];

		// let file = this.files[0];
		// if(!file.type.march("image.*")){
		// 	alert("Please select image only");
		// }else{
			// alert("image send")
		// }
		
		var reader = new FileReader();

		reader.addEventListener("load", function(){
			alert(reader.result);
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	}


	render() {
		const { message } = this.state
		return (
			<div className="message-input">
				<form 
					onSubmit={ this.handleSubmit }
					className="message-form">

					<input 
						id = "message"
						ref = {"messageinput"}
						type = "text"
						className = "form-control"
						value = { message }
						autoComplete = {'off'}
						placeholder = "Type here..."
						onKeyUp = { e => { e.keyCode !== 13 && this.sendTyping() } }
						onChange = {
							({target})=>{
								this.setState({message:target.value})
							}
						}
						/>
						
					<button
						disabled = { message.length < 1 }
						type = "submit"
						className = "send"

					> Send </button>
				</form>
				<a href="#" className="dropdown" onClick={this.ChooseImage}>
				<MdFileUpload/>
				<input type="file" id="imageFile" onChange={this.SendImage} accept="image/*" />
				</a>
			</div>
		);
	}
}
