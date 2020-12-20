import React, { useState, useRef} from 'react';

const withSideBarFn = Component => props => {	
	const [state, setState]= useState({
		reciever:"",
		activeSideBarFn: withSideBarFn.type.CHATS
	})

	const inputRef = useRef(null);

	const handleSubmit = (e) =>{
		e.preventDefault()
		const { reciever } = state
		const { onSendPrivateMessage } = props

		onSendPrivateMessage(reciever)
		setState({...state, reciever:reciever})
	}

	const addChatForUser = (reciever) =>{
		props.onSendPrivateMessage(reciever)
		setActiveSideBarFn(withSideBarFn.type.CHATS)
	}

	const setActiveSideBarFn = (type) =>{
		setState({...state, activeSideBarFn:type })
	}

	const handleChangeReciever = (e) => {
		setState({reciever:e.target.value})
	}

	const sideBarActions = {
		inputRef,
		handleSubmit,
		addChatForUser,
		setActiveSideBarFn, 
		handleChangeReciever
		
    }
	
    return (
        <Component {...sideBarActions} {...state}{...props} />
    )
}
withSideBarFn.type = {
	USERS:"users",
	CHATS:"chats"
}

export default (withSideBarFn);