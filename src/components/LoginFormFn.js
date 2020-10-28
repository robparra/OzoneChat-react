 import React, { useState, useRef } from 'react';
 import { VERIFY_USER } from '../Events'

 function LoginFormFn(props) {

	const [state, setState]= useState({
		nickname:(""),
		error:(""),
		showContent:(true)
	}) 
	
	const inputRef = useRef(null);


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

	
	return (
				<div >
					<div className="login" >
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