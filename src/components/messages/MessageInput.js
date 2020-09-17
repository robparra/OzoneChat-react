import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios'
import MdFileUpload from 'react-icons/lib/md/file-upload'
import MdBook from 'react-icons/lib/md/book'

export default class MessageInput extends Component {
	
	constructor(props) {
	  super(props);
	  this.ChooseImage=this.ChooseImage.bind(this)

	  this.onFileChange=this.onFileChange.bind(this)
	  this.onFileUpload=this.onFileUpload.bind(this)
	
	  this.state = {
	  	message:"",
	  	isTyping:false,
	  	selectedFile:null,
	  	isFile:false
	  };

	}
	
	handleSubmit = (e)=>{
		e.preventDefault()
		this.sendMessage()
		this.setState({message:""})
	}

	sendMessage = ()=>{
		this.props.sendMessage(this.state.message, this.state.isFile)

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

	

	onFileChange(event){
		this.setState({selectedFile:URL.createObjectURL(event.target.files[0])})
		this.setState({isFile:true})
	}

	onFileUpload(){
		this.props.sendMessage(this.state.selectedFile, this.state.isFile)
		this.setState({isFile:false})
		this.setState({selectedFile:""})
	
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

				<div className="file-upload">
						  <label for="imageUpload">
						    <MdBook/>
						  </label>
					<input id="imageUpload" type="file" onChange={this.onFileChange}/>
						  <label for="fileUpload">
							<MdFileUpload/>
						  </label>
					<input id="fileUpload" onClick={this.onFileUpload} />
				</div>

					<button
						type = "submit"
						className = "send"
						> Send 
					</button>
				</form>
				
				
			</div>
		);
	}
}
