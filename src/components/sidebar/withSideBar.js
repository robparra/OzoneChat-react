import React, { useState, useRef} from 'react';
import FASearch from 'react-icons/lib/fa/search'
import SideBarFnOption from './SideBarOption'
import { last, get, differenceBy } from 'lodash' 
import { createChatNameFromUsers } from '../../Factories'
import MdEject from 'react-icons/lib/md/eject'

const withSideBar = Component => props =>{

	const [state, setState]= useState({
		reciever:"",
		activeSideBarFn: SideBarFn.type.CHATS
	})

	const inputRef = useRef(null);

	const handleChange = (e)=>{	
		setState({...state,reciever:e.target.value})
	}

	const handleSubmit = (e) =>{
		e.preventDefault()
		const { reciever } = state
		const { onSendPrivateMessage } = props

		onSendPrivateMessage(reciever)
		setState({...state, reciever:reciever})
	}

	const addChatForUser = (reciever) =>{
		props.onSendPrivateMessage(reciever)
		setActiveSideBarFn(SideBarFn.type.CHATS)
	}

	const setActiveSideBarFn = (type) =>{
		setState({...state, activeSideBarFn:type })
	}


	const actionsSideBar = {
		handleSubmit,
		handleChange,
		addChatForUser, 
		setActiveSideBarFn

	}

	return (
        <Component {...actionsSideBar} {...props} />
    )

}

export default (withSideBar)