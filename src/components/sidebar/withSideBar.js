// import React, { useState, useRef} from 'react';
// import FASearch from 'react-icons/lib/fa/search'
// import SideBarFnOption from './SideBarOption'
// import { last, get, differenceBy } from 'lodash' 
// import { createChatNameFromUsers } from '../../Factories'
// import MdEject from 'react-icons/lib/md/eject'

// const withSideBar = Component => props =>{

// 	const [state, setState]= useState({
// 		reciever:"",
// 		activeSideBarFn: SideBarFn.type.CHATS
// 	})

// 	const inputRef = useRef(null);

// 	const handleChange = (e)=>{	
// 		setState({...state,reciever:e.target.value})
// 	}

// 	const handleSubmit = (e) =>{
// 		e.preventDefault()
// 		const { reciever } = state
// 		const { onSendPrivateMessage } = props

// 		onSendPrivateMessage(reciever)
// 		setState({...state, reciever:reciever})
// 	}

// 	const addChatForUser = (reciever) =>{
// 		props.onSendPrivateMessage(reciever)
// 		setActiveSideBarFn(SideBarFn.type.CHATS)
// 	}

// 	const setActiveSideBarFn = (type) =>{
// 		setState({...state, activeSideBarFn:type })
// 	}


// 	const actionsSideBar = {
// 		handleSubmit,
// 		handleChange,
// 		addChatForUser, 
// 		setActiveSideBarFn

// 	}

// 	return (
//         <Component {...actionsSideBar} {...props} />
//     )

// }

// export default (withSideBar)

/// AMERICA ///

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