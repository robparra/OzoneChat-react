// import React, { Component } from 'react';
// import SideBar from '../sidebar/SideBar'
// import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, 
// 				TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED,
// 				NEW_CHAT_USER } from '../../Events'
// import ChatHeading from './ChatHeading'
// import Messages from '../messages/Messages'
// import MessageInput from '../messages/MessageInput'
// import { values, difference, differenceBy } from 'lodash'


// export default class ChatContainer extends Component {
// 	constructor(props) {
// 	  super(props);
// 	  this.chatButtom = this.chatButtom.bind(this)	
	
// 	  this.state = {
// 		  chats:[],
// 		  users:[],
// 	  	activeChat:null,
// 	  	showContent:true
// 	  }
// 	}

// 	chatButtom(event){
// 		event.preventDefault()
// 		this.setState({
// 			showContent:!this.state.showContent
// 		})
// 	}

// 	componentDidMount() {
// 		const { socket } = this.props
// 		this.initSocket(socket)
// 	}
	
// 	componentWillUnmount() {
// 		const { socket } = this.props
// 		socket.off(PRIVATE_MESSAGE)
// 		socket.off(USER_CONNECTED)
// 		socket.off(USER_DISCONNECTED)
// 		socket.off(NEW_CHAT_USER)
// 	}
	
// 	initSocket(socket){
// 		socket.emit(COMMUNITY_CHAT, this.resetChat)
// 		socket.on(PRIVATE_MESSAGE, this.addChat)
// 		socket.on('connect', ()=>{
// 			socket.emit(COMMUNITY_CHAT, this.resetChat)
// 		})
// 		socket.on(USER_CONNECTED, (users)=>{
// 			this.setState({ users: values(users) })
// 		})
// 		socket.on(USER_DISCONNECTED, (users)=>{
// 			const removedUsers = differenceBy( this.state.users, values(users), 'id')
// 			this.removeUsersFromChat(removedUsers)
// 			this.setState({ users: values(users) })			
// 		})
// 		socket.on(NEW_CHAT_USER, this.addUserToChat)
// 	}

// 	sendOpenPrivateMessage = (reciever) => {
// 		const { socket, user } = this.props
// 		const { activeChat } = this.state
// 		socket.emit(PRIVATE_MESSAGE, {reciever, sender:user.name, activeChat})

// 	}
// 	addUserToChat = ({ chatId, newUser }) => {
// 		const { chats } = this.state
// 		const newChats = chats.map( chat => {
// 			if(chat.id === chatId){
// 				return Object.assign({}, chat, { users: [ ...chat.users, newUser ] })
// 			}
// 			return chat
// 		})
// 		this.setState({ chats:newChats })
// 	}
// 	removeUsersFromChat = removedUsers => {
// 		const { chats } = this.state
// 		const newChats = chats.map( chat => {
// 			let newUsers = difference( chat.users, removedUsers.map( u => u.name ) )
// 				return Object.assign({}, chat, { users: newUsers })
// 		})
// 		this.setState({ chats: newChats })
// 	}

// 	/*
// 	*	Reset the chat back to only the chat passed in.
// 	* 	@param chat {Chat}
// 	*/
// 	resetChat = (chat)=>{
// 		return this.addChat(chat, true)
// 	}

// 	/*
// 	*	Adds chat to the chat container, if reset is true removes all chats
// 	*	and sets that chat to the main chat.
// 	*	Sets the message and typing socket events for the chat.
// 	*	
// 	*	@param chat {Chat} the chat to be added.
// 	*	@param reset {boolean} if true will set the chat as the only chat.
// 	*/
// 	addChat = (chat, reset = false)=>{
// 		const { socket } = this.props
// 		const { chats } = this.state

// 		const newChats = reset ? [chat] : [...chats, chat]
// 		this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})

// 		const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
// 		const typingEvent = `${TYPING}-${chat.id}`

// 		socket.on(typingEvent, this.updateTypingInChat(chat.id))
// 		socket.on(messageEvent, this.addMessageToChat(chat.id))
// 	}

// 	/*
// 	* 	Returns a function that will 
// 	*	adds message to chat with the chatId passed in. 
// 	*
// 	* 	@param chatId {number}
// 	*/
// 	addMessageToChat = (chatId)=>{
// 		return message => {
// 			const { chats } = this.state
// 			let newChats = chats.map((chat)=>{
// 				if(chat.id === chatId)
// 					chat.messages.push(message)
// 				return chat
// 			})

// 			this.setState({chats:newChats})
// 		}
// 	}

// 	/*
// 	*	Updates the typing of chat with id passed in.
// 	*	@param chatId {number}
// 	*/
// 	updateTypingInChat = (chatId) =>{
// 		return ({isTyping, user})=>{
// 			if(user !== this.props.user.name){

// 				const { chats } = this.state

// 				let newChats = chats.map((chat)=>{
// 					if(chat.id === chatId){
// 						if(isTyping && !chat.typingUsers.includes(user)){
// 							chat.typingUsers.push(user)
// 						}else if(!isTyping && chat.typingUsers.includes(user)){
// 							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
// 						}
// 					}
// 					return chat
// 				})
// 				this.setState({chats:newChats})
// 			}
// 		}
// 	}

// 	/*
// 	*	Adds a message to the specified chat
// 	*	@param chatId {number}  The id of the chat to be added to.
// 	*	@param message {string} The message to be added to the chat.
// 	*/
// 	sendMessage = (chatId, message, isFile)=>{
// 		console.log("sen message: ", message, "is file: ", isFile)
// 		const { socket } = this.props
// 		socket.emit(MESSAGE_SENT, {chatId, message, isFile} )
// 	}

// 	/*
// 	*	Sends typing status to server.
// 	*	chatId {number} the id of the chat being typed in.
// 	*	typing {boolean} If the user is typing still or not.
// 	*/
// 	sendTyping = (chatId, isTyping)=>{
// 		const { socket } = this.props
// 		socket.emit(TYPING, {chatId, isTyping})
// 	}

// 	setActiveChat = (activeChat)=>{
// 		this.setState({activeChat})
// 	}
// 	render() {
// 		const { user, logout } = this.props
// 		const { chats, activeChat, users } = this.state
// 		const {showContent} = this.state
// 		return (
			
// 			<div className="container">
// 			{showContent === true ?
// 				<SideBar
// 					logout={logout}
// 					chats={chats}
// 					user={user}
// 					users={users}
// 					activeChat={activeChat}
// 					setActiveChat={this.setActiveChat}
// 					onSendPrivateMessage={this.sendOpenPrivateMessage}
// 					/>
// 					:''}
// 				<div className="chat-room-container">
// 				{showContent === true ?
// 					<div className="container">
// 					{
						
// 						activeChat !== null ? (

// 							<div className="chat-room">
// 								<ChatHeading name={activeChat.name} />
// 								<Messages 
// 									messages={activeChat.messages}
// 									user={user}
// 									typingUsers={activeChat.typingUsers}
// 									/>
// 								<MessageInput 
// 									sendMessage={
// 										(message, isFile)=>{
// 											console.log("message input: ", message)
// 											this.sendMessage(activeChat.id, message, isFile)
// 										}
// 									}
// 									sendTyping={
// 										(isTyping)=>{
// 											this.sendTyping(activeChat.id, isTyping)
// 										}
// 									}
// 									/>

// 							</div>
// 						):
// 						<div className="chat-room choose">
// 							<h3>Choose a chat!</h3>
// 						</div>
						

// 					}
// 					</div>
// 					:''}
// 				</div>
// 				<button id="button-chat" onClick={this.chatButtom}>Chat</button>

// 			</div>
			
// 		);
// 	}
// }


// import React, { useState, useEffect } from 'react';
// import SideBar from '../sidebar/SideBar'
// import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, 
// 				TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED,
// 				NEW_CHAT_USER } from '../../Events'
// import ChatHeading from './ChatHeading'
// import Messages from '../messages/Messages'
// import MessageInput from '../messages/MessageInput'
// import { values, difference, differenceBy } from 'lodash'

// function ChatContainerFn(props){
// 	const [state, setState]=useState({
// 		chats:[],
// 		users:[],
// 	  	activeChat:null,
// 	  	showContent:true
// 	})

// 	const chatButtom = (event) =>{
// 		event.preventDefault()
// 		setState({...state, showContent:!state.showContent})
// 	}

// 	useEffect(() => {      
//         const { socket } = props
// 		initSocket(socket)
//     }, [])

//     useEffect(() => {      
//         const { socket } = props
// 		socket.off(PRIVATE_MESSAGE)
// 		socket.off(USER_CONNECTED)
// 		socket.off(USER_DISCONNECTED)
// 		socket.off(NEW_CHAT_USER)
//     }, [])

//     const initSocket = (socket) =>{
//     	socket.emit(COMMUNITY_CHAT, resetChat)
// 		socket.on(PRIVATE_MESSAGE, addChat)
// 		socket.on('connect', ()=>{
// 			socket.emit(COMMUNITY_CHAT, resetChat)
// 		})
// 		socket.on(USER_CONNECTED, (users)=>{
// 			setState({...state, users: values(users) })
// 		})
// 		socket.on(USER_DISCONNECTED, (users)=>{
// 			const removedUsers = differenceBy( state.users, values(users), 'id')
// 			removeUsersFromChat(removedUsers)
// 			setState({...state, users: values(users) })			
// 		})
// 		socket.on(NEW_CHAT_USER, addUserToChat)
//     }

//     const sendOpenPrivateMessage = (reciever) =>{
//     	const { socket, user } = props
// 		const { activeChat } = state
// 		socket.emit(PRIVATE_MESSAGE, {reciever, sender:user.name, activeChat})
//     }

//     const addUserToChat = ({ chatId, newUser }) =>{
//     	const { chats } = state
// 		const newChats = chats.map( chat => {
// 			if(chat.id === chatId){
// 				return Object.assign({}, chat, { users: [ ...chat.users, newUser ] })
// 			}
// 			return chat
// 		})
// 		setState({...state, chats:newChats })
//     }

//     const removeUsersFromChat = (removedUsers) =>{
//     	const { chats } = state
// 		const newChats = chats.map( chat => {
// 			let newUsers = difference( chat.users, removedUsers.map( u => u.name ) )
// 				return Object.assign({}, chat, { users: newUsers })
// 		})
// 		setState({...state, chats: newChats })
//     }

//     const resetChat = (chat) =>{
//     	return addChat(chat, true)
//     }

//     const addChat = (chat, reset = false) =>{
//     	const { socket } = props
// 		const { chats } = state

// 		const newChats = reset ? [chat] : [...chats, chat]
// 		setState({...state, chats:newChats, activeChat:reset ? chat : state.activeChat})

// 		const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
// 		const typingEvent = `${TYPING}-${chat.id}`

// 		socket.on(typingEvent, updateTypingInChat(chat.id))
// 		socket.on(messageEvent, addMessageToChat(chat.id))
//     }

//     const addMessageToChat = (chatId) =>{
//     	return message => {
// 			const { chats } = state
// 			let newChats = chats.map((chat)=>{
// 				if(chat.id === chatId)
// 					chat.messages.push(message)
// 				return chat
// 			})

// 			setState({...state, chats:newChats})
// 		}
//     }

//     const updateTypingInChat = (chatId) =>{
//     	return ({isTyping, user})=>{
// 			if(user !== props.user.name){

// 				const { chats } = state

// 				let newChats = chats.map((chat)=>{
// 					if(chat.id === chatId){
// 						if(isTyping && !chat.typingUsers.includes(user)){
// 							chat.typingUsers.push(user)
// 						}else if(!isTyping && chat.typingUsers.includes(user)){
// 							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
// 						}
// 					}
// 					return chat
// 				})
// 				setState({...state, chats:newChats})
// 			}
// 		}
//     }

//     const sendMessage = (chatId, message, isFile) =>{
//     	console.log("send message: ", message, "is file: ", isFile)
// 		const { socket } = props
// 		socket.emit(MESSAGE_SENT, {chatId, message, isFile} )
//     }

//     const sendTyping = (chatId, isTyping) =>{
//     	const { socket } = props
// 		socket.emit(TYPING, {chatId, isTyping})
//     }

//     const setActiveChat = (activeChat) =>{
//     	setState({...state, activeChat})
//     }

//     return(
//     	<div className="container">
// 			{state.showContent === true ?
// 				<SideBar
// 					logout={props.logout}
// 					chats={state.chats}
// 					user={props.user}
// 					users={state.users}
// 					activeChat={state.activeChat}
// 					setActiveChat={setActiveChat}
// 					onSendPrivateMessage={sendOpenPrivateMessage}
// 					/>
// 					:''}
// 				<div className="chat-room-container">
// 				{state.showContent === true ?
// 					<div className="container">
// 					{
						
// 						state.activeChat !== null ? (

// 							<div className="chat-room">
// 								<ChatHeading name={state.activeChat.name} />
// 								<Messages 
// 									messages={state.activeChat.messages}
// 									user={props.user}
// 									typingUsers={state.activeChat.typingUsers}
// 									/>
// 								<MessageInput 
// 									sendMessage={
// 										(message, isFile)=>{
// 											console.log("message input: ", message)
// 											sendMessage(state.activeChat.id, message, isFile)
// 										}
// 									}
// 									sendTyping={
// 										(isTyping)=>{
// 											sendTyping(state.activeChat.id, isTyping)
// 										}
// 									}
// 									/>

// 							</div>
// 						):
// 						<div className="chat-room choose">
// 							<h3>Choose a chat!</h3>
// 						</div>
						

// 					}
// 					</div>
// 					:''}
// 				</div>
// 				<button id="button-chat" onClick={chatButtom}>Chat</button>

// 			</div>
			
// 		);
// }

// export default (ChatContainerFn);

import React, {   } from 'react';
import SideBar from '../sidebar/SideBar'
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'
import withChatContainer from './withChatContainer';

 const ChatContainer = props => {
	
    return (
		
		<div className="container">
		
		{props.showContent  ?
			<SideBar
				logout={props.logout}
				chats={props.chats}
				user={props.user}
				users={props.users}
				activeChat={props.activeChat}
				setActiveChat={props.setActiveChat}
				onSendPrivateMessage={props.sendOpenPrivateMessage}
				/>
				:''}
			<div className="chat-room-container">
			{props.showContent  ?
				<div className="container">
				{
					
					props.activeChat !== null ? (

						<div className="chat-room">
							<ChatHeading name={props.activeChat.name} />
							<Messages 
								messages={props.activeChat.messages}
								user={props.user}
								typingUsers={props.activeChat.typingUsers}
								/>
							<MessageInput 
								sendMessage={
									(message, isFile)=>{
										props.sendMessage(props.activeChat.id, message, isFile)
									}
								}
								sendTyping={
									(isTyping)=>{
										props.sendTyping(props.activeChat.id, isTyping)
									}
								}
								/>

						</div>
					):
					<div className="chat-room choose">
						<h3>Choose a chat!</h3>
					</div>
				}
				</div>
				:''}
			</div>
			<button id="button-chat" onClick={props.chatButtom}>Chat</button>

		</div>
		
	); 
 }

 export default (withChatContainer(ChatContainer));