// import React, { Component } from 'react';
// import { VERIFY_USER } from '../Events'

// export default class LoginForm extends Component {
// 	constructor(props) {
// 	  super(props);
// 	  this.chatButtom = this.chatButtom.bind(this)
	
// 	  this.state = {
// 	  	nickname:"",
// 	  	error:"",
// 	  	showContent:true
// 	  };
// 	}

// 	chatButtom(event){
// 		event.preventDefault()
// 		this.setState({
// 			showContent:!this.state.showContent
// 		})
// 	}

// 	setUser = ({user, isUser})=>{

// 		if(isUser){
// 			// this.setError("User name taken")
// 			// this.setError("")
// 			this.props.setUser(user)
// 		}else{
// 			// this.setError("")
// 			this.props.setUser(user)
// 		}
// 	}

// 	handleSubmit = (e)=>{
// 		e.preventDefault()
// 		const { socket } = this.props
// 		const { nickname } = this.state
// 		socket.emit(VERIFY_USER, nickname, this.setUser)
// 	}

// 	handleChange = (e)=>{	
// 		this.setState({nickname:e.target.value})
// 	}

// 	setError = (error)=>{
// 		this.setState({error})
// 	}

// 	render() {	
// 		const { nickname, error } = this.state
// 		const {showContent} = this.state
// 		return (
// 			<div className="login" ><div className="login" >
// 			{showContent === true ?
// 				<form onSubmit={this.handleSubmit} className="login-form" >
// 					<input
// 						ref={(input)=>{ this.textInput = input }} 
// 						type="text"
// 						id="nickname"
// 						value={nickname}
// 						onChange={this.handleChange}
// 						placeholder={'ChatUsername'}
// 						/>
// 						<button id="submit"
// 						type = "submit"
// 						className = "login"

// 					> login </button>
// 						<div className="error">{error ? error:null}</div>
						

// 				</form>
// 			:''}
// 		</div><button id="button-chatlogin" onClick={this.chatButtom}>Chat</button>
//  </div>
			
// 		);
// 	}
// }

import React, { useState, useRef } from 'react';
import { VERIFY_USER } from '../Events'

 function LoginFormFn(props) {

 	const [state, setState]= useState({
         nickname:(""),
         error:(""),
 	  	showContent:(true)
 	}) 

 const inputRef = useRef(null);	


// 	// const [nickname,setNickname]= useState('')

// 	const [error, setError]= useState('')

 const chatButton = (event) =>{
 	event.preventDeafault()
 	setState({...state, showContent:!state.showContent})
 }

 const setUser = (user, isUser) =>{
 	if (isUser) {
 		props.setUser(user)
 	}else{
 		props.setUser(user)
 	}
 }

 const handleSubmit = (e) =>{
 	e.preventDefault()
 	const { socket } = props
 	const { nickname } = state.nickname
 	socket.emit(VERIFY_USER, nickname, setUser)
 }

 const handleChange = (e) =>{
 	setState({...state, nickname:e.target.value})
 }

 // const setError = (error) =>{
 // 	setState({...state, error})
 // }

 return (
 			<div className="login" ><div className="login" >
 			{state.showContent === true ?
 				<form onSubmit={handleSubmit} className="login-form" >
 					<input
 						ref={inputRef} 
 						type="text"
 						id="nickname"
 						value={state.nickname}
						onChange={handleChange}
 						placeholder={'ChatUsername'}
 						/>
 						<button id="submit"
 						type = "submit"
 						className = "login"

 					> login </button>
 						


 				</form>
 			:''}
 		</div>
 		<button id="button-chatlogin" onClick={() => chatButton()}>Chat</button>
  </div>

 		);

 }
 export default (LoginFormFn);
