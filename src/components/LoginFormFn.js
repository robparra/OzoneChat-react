 import React, { useState } from 'react';
 import { VERIFY_USER } from '../Events'

 function LoginFormFn(props) {

 	const [state, setState]= useState({
         nickname:(""),
         error:(""),
 	  	showContent:(true)
 	}) 

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

 const setError = (error) =>{
 	setState({...state, error})
 }

 return (
 			<div className="login" ><div className="login" >
 			{state.showContent === true ?
 				<form onSubmit={handleSubmit} className="login-form" >
 					<input
 						ref={(input)=>{ textInput = input }} 
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
 						<div className="error">{state.error ? error:null}</div>
						

 				</form>
 			:''}
 		</div><button id="button-chatlogin" onClick={() => chatButton()}>Chat</button>
  </div>
			
 		);
	
 }
 export default (LoginFormFn);