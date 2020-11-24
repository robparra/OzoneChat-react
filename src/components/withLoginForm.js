import React, { useState, useRef } from 'react';
import { VERIFY_USER } from '../Events'

 const withLoginFormFn = Component => props => {

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

const actionsLoginForm = {
		 
		setState,
		state,
		inputRef,
		chatButton,
		setUser,
		handleSubmit,
		handleChange

	}

	return ( < Component { ...actionsLoginForm} {...state} { ...props}/>
    	)
}

export default (withLoginFormFn);