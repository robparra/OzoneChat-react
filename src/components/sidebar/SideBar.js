// import React, { Component } from 'react';
// import FASearch from 'react-icons/lib/fa/search'
// import SideBarFnOption from './SideBarFnOption'
// import { last, get, differenceBy } from 'lodash' 
// import { createChatNameFromUsers } from '../../Factories'
// import MdEject from 'react-icons/lib/md/eject'

// export default class SideBarFn extends Component{
// 	static type = {
// 		USERS:"users",
// 		CHATS:"chats"
// 	}
// 	constructor(props){
// 		super(props)
// 		this.state = {
// 			reciever:"",
// 			activeSideBarFn: SideBarFn.type.CHATS
// 		}
// 	}
// 	handleSubmit = (e) => {
// 		e.preventDefault()
// 		const { reciever } = this.state
// 		const { onSendPrivateMessage } = this.props

// 		onSendPrivateMessage(reciever)
// 		this.setState({reciever:""})
// 	}

// 	addChatForUser = (reciever) => {
// 		this.props.onSendPrivateMessage(reciever)
// 		this.setActiveSideBarFn(SideBarFn.type.CHATS)
// 	}
// 	setActiveSideBarFn = (type) => {
// 		this.setState({ activeSideBarFn:type })
// 	}

// 	render(){
// 		const { chats, activeChat, user, setActiveChat, logout, users } = this.props
// 		const { reciever, activeSideBarFn } = this.state
// 		return (
// 			<div id="side-bar">
// 					<div className="heading">
						
// 					</div>
// 					<form onSubmit={this.handleSubmit} className="search">
// 						<i className="search-icon"><FASearch /></i>
// 						<input 
// 							placeholder="Search" 
// 							type="text"
// 							value={reciever}
// 							onChange={(e)=>{ this.setState({reciever:e.target.value}) }}/>
// 					</form>
// 					<div className="side-bar-select">
// 						<div 
// 							onClick = { ()=>{ this.setActiveSideBarFn(SideBarFn.type.CHATS) } }
// 							className={`side-bar-select__option ${ activeSideBarFn === SideBarFn.type.CHATS ? 'active':''}`}>
// 							<span>Chats</span>
// 						</div>
// 						<div 
// 							onClick = { ()=>{ this.setActiveSideBarFn(SideBarFn.type.USERS) } }
// 							className={`side-bar-select__option ${ activeSideBarFn === SideBarFn.type.USERS ? 'active':''}`}>
// 							<span>Users</span>
// 						</div>
// 					</div>
// 					<div 
// 						className="users" 
// 						ref='users' 
// 						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
// 						{
// 						activeSideBarFn === SideBarFn.type.CHATS ?
// 						chats.map((chat)=>{
// 								return(
// 								<SideBarFnOption 
// 									key = {chat.id}
// 									lastMessage = { get(last(chat.messages), 'message', '') }
// 									name = { chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name) }
// 									active = { activeChat.id === chat.id }
// 									onClick = { ()=>{ this.props.setActiveChat(chat) } }
// 								/>
// 							)
// 						})	
						
// 						:
// 							differenceBy(users, [user], 'name').map((user)=>{
// 								return <SideBarFnOption 
// 									key = { user.id }
// 									name = { user.name }
// 									onClick = { ()=>{ this.addChatForUser(user.name) }  }
// 								/>
// 							})
// 						}
// 					</div>
// 					<div className="current-user">
// 						<span>{user.name}</span>
// 						<div onClick={()=>{logout()}} title="Logout" className="logout">
// 							<MdEject/>	
// 						</div>
// 					</div>
// 			</div>
// 		);
	
// 	}
// }


// import React, { useState, useRef} from 'react';
// import FASearch from 'react-icons/lib/fa/search'
// import SideBarFnOption from './SideBarOption'
// import { last, get, differenceBy } from 'lodash' 
// import { createChatNameFromUsers } from '../../Factories'
// import MdEject from 'react-icons/lib/md/eject'

// function SideBarFn(props){
// 	const [state, setState]= useState({
// 		reciever:"",
// 		activeSideBarFn: SideBarFn.type.CHATS
// 	})

// 	const inputRef = useRef(null);

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

// 	return (
// 			<div id="side-bar">
// 					<div className="heading">
						
// 					</div>
// 					<form onSubmit={handleSubmit} className="search">
// 						<i className="search-icon"><FASearch /></i>
// 						<input 
// 							placeholder="Search" 
// 							type="text"
// 							value={state.reciever}
// 							onChange={(e)=>{ setState({reciever:e.target.value}) }}/>
// 					</form>
// 					<div className="side-bar-select">
// 						<div 
// 							onClick = { ()=>{ setActiveSideBarFn(SideBarFn.type.CHATS) } }
// 							className={`side-bar-select__option ${ state.activeSideBarFn === SideBarFn.type.CHATS ? 'active':''}`}>
// 							<span>Chats</span>
// 						</div>
// 						<div 
// 							onClick = { ()=>{ setActiveSideBarFn(SideBarFn.type.USERS) } }
// 							className={`side-bar-select__option ${ state.activeSideBarFn === SideBarFn.type.USERS ? 'active':''}`}>
// 							<span>Users</span>
// 						</div>
// 					</div>
// 					<div 
// 						className="users" 
// 						ref={inputRef} 
// 						onClick={(e)=>{ (e.target === inputRef.user) && props.setActiveChat(null) }}>
						
// 						{
// 						state.activeSideBarFn === SideBarFn.type.CHATS ?
// 						props.chats.map((chat)=>{
// 								return(
// 								<SideBarFnOption 
// 									key = {chat.id}
// 									lastMessage = { get(last(chat.messages), 'message', '') }
// 									name = { chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, props.user.name) }
// 									active = { props.activeChat.id === chat.id }
// 									onClick = { ()=>{ props.setActiveChat(chat) } }
// 								/>
// 							)
// 						})	
						
// 						:
// 							differenceBy(props.users, [props.user], 'name').map((user)=>{
// 								return <SideBarFnOption 
// 									key = { user.id }
// 									name = { user.name }
// 									onClick = { ()=>{ addChatForUser(user.name) }  }
// 								/>
// 							})
// 						}
// 					</div>
// 					<div className="current-user">
// 						<span>{props.user.name}</span>
// 						<div onClick={()=>{props.logout()}} title="Logout" className="logout">
// 							<MdEject/>	
// 						</div>
// 					</div>
// 			</div>
// 		);
// }

// SideBarFn.type = {
// 		USERS:"users",
// 		CHATS:"chats"
// }

// export default (SideBarFn);

import React, { useState, useRef} from 'react';
import FASearch from 'react-icons/lib/fa/search'
import SideBarFnOption from './SideBarOption'
import { last, get, differenceBy } from 'lodash' 
import { createChatNameFromUsers } from '../../Factories'
import MdEject from 'react-icons/lib/md/eject'
import withSideBar from './withSideBar';

const SideBarFn = props => {
	
	return (
		<div id="side-bar">
				<div className="heading">
					
				</div>
				<form onSubmit={props.handleSubmit} className="search">
					<i className="search-icon"><FASearch /></i>
					<input 
						placeholder="Search user" 
						type="text"
						value={props.reciever}
						onChange={props.handleChangeReciever}/>
				</form>
				<div className="side-bar-select">
					<div 
						onClick = { ()=>{ props.setActiveSideBarFn(SideBarFn.type.CHATS) } }
						className={`side-bar-select__option ${ props.activeSideBarFn === SideBarFn.type.CHATS ? 'active':''}`}>
						<span>Chats</span>
					</div>
					<div 
						onClick = { ()=>{ props.setActiveSideBarFn(SideBarFn.type.USERS) } }
						className={`side-bar-select__option ${ props.activeSideBarFn === SideBarFn.type.USERS ? 'active':''}`}>
						<span>Users</span>
					</div>
				</div>
				<div 
					className="users" 
					ref={props.inputRef} 
					onClick={(e)=>{ (e.target === props.inputRef.user) && props.setActiveChat(null) }}>
					
					{
					props.activeSideBarFn === SideBarFn.type.CHATS ?
					props.chats.map((chat)=>{
							return(
							<SideBarFnOption 
								key = {chat.id}
								// lastMessage = { get(last(chat.messages), 'message', '') }
								name = { chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, props.user.name) }
								active = { props.activeChat.id === chat.id }
								onClick = { ()=>{ props.setActiveChat(chat) } }
							/>
						)
					})	
					
					:
						differenceBy(props.users, [props.user], 'name').map((user)=>{
							return <SideBarFnOption 
								key = { user.id }
								name = { user.name }
								onClick = { ()=>{ props.addChatForUser(user.name) }  }
							/>
						})
					}
				</div>
				<div className="current-user">
					<span>You are: {props.user.name}</span>
					<div onClick={()=>{props.logout()}} title="Logout" className="logout">
						<MdEject/>	
					</div>
				</div>
		</div>
	);
}

SideBarFn.type = {
	USERS:"users",
	CHATS:"chats"
}
export default (withSideBar(SideBarFn));
