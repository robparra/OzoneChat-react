import React, { useState, useRef } from 'react';
import { VERIFY_USER } from '../Events'

const withLoginForm = Component => props => { 
	const[state, setState]=useState({
		nickname:"",
 	  	error:"",
 	  	showContent:true
	})

	const inputRef = useRef("");
	
 	const chatButtom = (event) =>{
 		event.preventDefault()
 		setState({...state, 
 			showContent:!state.showContent
		 })
	
 	}

 	const setUser = ({user, isUser})=>{

 		if(isUser){
 			// this.setError("User name taken")
 			// this.setError("")
 			props.setUser(user)
 		}else{
 			// this.setError("")
 			props.setUser(user)
 		}
 	}

 	const handleSubmit = (e)=>{
 		e.preventDefault()
 		const { socket } = props
 		const { nickname } = state
 		socket.emit(VERIFY_USER, nickname, setUser)
 	}

 	const handleChange = (e)=>{	
		 setState({...state, nickname:e.target.value})
		 
 	}

 	const setError = (error)=>{
		 setState({...state, error:error})
		 console.log("error: ", state.error)
	 }

	 const loginFormActions = {
		inputRef,
		chatButtom,
		handleSubmit,
		handleChange,
		setError
    }
	
    return (
        <Component {...loginFormActions} {...state}{...props} />
    )
}


export default (withLoginForm);