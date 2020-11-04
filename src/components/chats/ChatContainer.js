//   import React, { Component } from 'react';
//  import SideBar from '../sidebar/SideBar'
//  import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, 
//  				TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED,
//  				NEW_CHAT_USER } from '../../Events'
//  import ChatHeading from './ChatHeading'
//  import Messages from '../messages/Messages'
//  import MessageInput from '../messages/MessageInput'
//  import { values, difference, differenceBy } from 'lodash'


//  export default class ChatContainer extends Component {
//  	constructor(props) {
//  	  super(props);
//  	  this.chatButtom = this.chatButtom.bind(this)	
	
//  	  this.state = {
//  		  chats:[],
//  		  users:[],
//  	  	activeChat:null,
//  	  	showContent:true,
//  	  }
//  	}

//  	chatButtom(event){
//  		event.preventDefault()
//  		this.setState({
//  			showContent:!this.state.showContent
// 		 })	
//  	}

//  	componentDidMount() {
//  		const { socket } = this.props
//  		this.initSocket(socket)
//  	}
	
//  	componentWillUnmount() {
//  		const { socket } = this.props
//  		socket.off(PRIVATE_MESSAGE)
//  		socket.off(USER_CONNECTED)
//  		socket.off(USER_DISCONNECTED)
//  		socket.off(NEW_CHAT_USER)
//  	}
	
//  	initSocket(socket){
//  		socket.emit(COMMUNITY_CHAT, this.resetChat)
//  		socket.on(PRIVATE_MESSAGE, this.addChat)
//  		socket.on('connect', ()=>{
//  			socket.emit(COMMUNITY_CHAT, this.resetChat)
//  		})
//  		socket.on(USER_CONNECTED, (users)=>{
// 			 this.setState({ users: values(users) })
//  		})
//  		socket.on(USER_DISCONNECTED, (users)=>{
//  			const removedUsers = differenceBy( this.state.users, values(users), 'id')
//  			this.removeUsersFromChat(removedUsers)
// 			 this.setState({ users: values(users) })	
				
//  		})
//  		socket.on(NEW_CHAT_USER, this.addUserToChat)
//  	}

//  	sendOpenPrivateMessage = (reciever) => {
//  		const { socket, user } = this.props
//  		const { activeChat } = this.state
//  		socket.emit(PRIVATE_MESSAGE, {reciever, sender:user.name, activeChat})

//  	}
//  	addUserToChat = ({ chatId, newUser }) => {
		
//  		const { chats } = this.state
//  		const newChats = chats.map( chat => {
//  			if(chat.id === chatId){
//  				return Object.assign({}, chat, { users: [ ...chat.users, newUser ] })
//  			}
//  			return chat
//  		})
// 		 this.setState({ chats:newChats })
		
//  	}
//  	removeUsersFromChat = removedUsers => {
//  		const { chats } = this.state
//  		const newChats = chats.map( chat => {
//  			let newUsers = difference( chat.users, removedUsers.map( u => u.name ) )
//  				return Object.assign({}, chat, { users: newUsers })
//  		})
// 		 this.setState({ chats: newChats })
		 
//  	}

//  	resetChat = (chat)=>{
//  		return this.addChat(chat, true)
//  	}

//  	addChat = (chat, reset = false)=>{
//  		const { socket } = this.props
// 		const { chats } = this.state

// 		console.log("chatContainer add chat - reset: ", reset)
// 		console.log("chatContainer add chat - chat: ", chat)
// 		console.log("chatContainer add chat activeChat state: ", this.state.activeChat)
// 		console.log("chatContainer add chat chats state: ", this.state.chats)
		
// 		const newChats = reset ? [chat] : [...chats, chat]
// 		const activeChat = reset ?  chat : this.state.activeChat
// 		this.setState({chats:newChats, activeChat:activeChat})

// 		console.log("chatContainer add chat activeChat state after: ", this.state.activeChat)
// 		console.log("chatContainer add chat chats state after: ", this.state.chats)
		
//  		const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
//  		const typingEvent = `${TYPING}-${chat.id}`

//  		socket.on(typingEvent, this.updateTypingInChat(chat.id))
//  		socket.on(messageEvent, this.addMessageToChat(chat.id))
//  	}

 
//  	addMessageToChat = (chatId)=>{
//  		return message => {
//  			const { chats } = this.state
//  			let newChats = chats.map((chat)=>{
//  				if(chat.id === chatId)
//  					chat.messages.push(message)
//  				return chat
//  			})

// 			 this.setState({chats:newChats})
			 
//  		}
//  	}

//  	updateTypingInChat = (chatId) =>{
		
//  		return ({isTyping, user})=>{
//  			if(user !== this.props.user.name){

//  				const { chats } = this.state

//  				let newChats = chats.map((chat)=>{
//  					if(chat.id === chatId){
//  						if(isTyping && !chat.typingUsers.includes(user)){
//  							chat.typingUsers.push(user)
//  						}else if(!isTyping && chat.typingUsers.includes(user)){
//  							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
//  						}
//  					}
//  					return chat
//  				})
// 				 this.setState({chats:newChats})
				
//  			}
// 		}
//  	}

//  	sendMessage = (chatId, message, isFile)=>{
 		
//  		const { socket } = this.props
//  		socket.emit(MESSAGE_SENT, {chatId, message, isFile} )
//  	}

//  	sendTyping = (chatId, isTyping)=>{
		
//  		const { socket } = this.props
//  		socket.emit(TYPING, {chatId, isTyping})
//  	}

//  	setActiveChat = (activeChat)=>{
		
// 		 this.setState({activeChat})
// 		 console.log("chatContainer setActiveChats chats: ", this.state.activeChat)
//  	}
//  	render() {
//  		const { user, logout } = this.props
//  		const { chats, activeChat, users } = this.state
//  		const {showContent} = this.state
//  		return (
			
//  			<div className="container">
			
//  			{showContent === true ?
//  				<SideBar
//  					logout={logout}
//  					chats={chats}
//  					user={user}
//  					users={users}
//  					activeChat={activeChat}
//  					setActiveChat={this.setActiveChat}
//  					onSendPrivateMessage={this.sendOpenPrivateMessage}
//  					/>
//  					:''}
//  				<div className="chat-room-container">
//  				{showContent === true ?
//  					<div className="container">
//  					{
						
//  						activeChat !== null ? (

//  							<div className="chat-room">
//  								<ChatHeading name={activeChat.name} />
//  								<Messages 
//  									messages={activeChat.messages}
//  									user={user}
//  									typingUsers={activeChat.typingUsers}
//  									/>
//  								<MessageInput 
//  									sendMessage={
// 										(message, isFile)=>{
//  											console.log("message input: ", message)
//  											this.sendMessage(activeChat.id, message, isFile)
//  										}
//  									}
//  									sendTyping={
//  										(isTyping)=>{
//  											this.sendTyping(activeChat.id, isTyping)
//  										}
//  									}
//  									/>

//  							</div>
//  						):
//  						<div className="chat-room choose">
//  							<h3>Choose a chat!</h3>
//  						</div>
						

//  					}
//  					</div>
//  					:''}
//  				</div>
//  				<button id="button-chat" onClick={this.chatButtom}>Chat</button>

//  			</div>
			
//  		);
//  	}
// }     
      
 
 import React, {  useState, useEffect } from 'react';
 import SideBar from '../sidebar/SideBar'
 import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, 
 				TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED,
 				NEW_CHAT_USER } from '../../Events'
 import ChatHeading from './ChatHeading'
 import Messages from '../messages/Messages'
 import MessageInput from '../messages/MessageInput'
 import { values, difference, differenceBy } from 'lodash'

 
 export default function ChatContainer (props) {
	const[state, setState]=useState({
		chats:[],
 		users:[],
 	  	activeChat: null,
 	  	showContent:true,
	})

 	const chatButtom = (event)=>{ 
		event.preventDefault()
  		setState({...state, showContent:!state.showContent})
 	}

	useEffect(() => {   
		 // Anything in here is fired on component mount.   
		const { socket } = props
		initSocket(socket)
		return () => {
			// Anything in here is fired on component unmount.
			const { socket } = props
			socket.off(PRIVATE_MESSAGE)
			socket.off(USER_CONNECTED)
			socket.off(USER_DISCONNECTED)
			socket.off(NEW_CHAT_USER) 
        }
	}, [])
 
 	const initSocket = (socket)=>{
		socket.emit(COMMUNITY_CHAT, resetChat)
		socket.on(PRIVATE_MESSAGE, addChat)
		socket.on('connect', ()=>{
		socket.emit(COMMUNITY_CHAT, resetChat)
		})
		socket.on(USER_CONNECTED, (users)=>{
			setState({...state, users: values(users) })
		})
		socket.on(USER_DISCONNECTED, (users)=>{
			const removedUsers = differenceBy( state.users, values(users), 'id')
			removeUsersFromChat(removedUsers)
			setState({...state, users: values(users) })	
				
		})
		socket.on(NEW_CHAT_USER, addUserToChat)
 	}

 	const sendOpenPrivateMessage = (reciever) => {
 		const { socket, user } = props
 		const { activeChat } = state
 		socket.emit(PRIVATE_MESSAGE, {reciever, sender:user.name, activeChat})

 	}
 	const addUserToChat = ({ chatId, newUser }) => {
		const { chats } = state
		const newChats = chats.map( chat => {
			if(chat.id === chatId){
				return Object.assign({}, chat, { users: [ ...chat.users, newUser ] })
			}
			return chat
		})
		setState({...state, chats:newChats })
	 }
	 
 	const removeUsersFromChat = (removedUsers) => {
		const { chats } = state
		const newChats = chats.map( chat => {
			let newUsers = difference( chat.users, removedUsers.map( u => u.name ) )
				return Object.assign({}, chat, { users: newUsers })
		})
		setState({...state, chats: newChats })
 	}

 	const resetChat =  (chat)=>{
 		return addChat(chat, true)
 	}

 	const addChat = (chat, reset = false)=>{
		
		const { socket } = props
		const { chats } = state

		console.log("chatContainer add chat - reset: ", reset)
		console.log("chatContainer add chat activeChat state: ", state.activeChat)

		const newChats = reset ? [chat] : [...chats, chat]
		const activeChat = reset ?  chat : state.activeChat
		console.log("chatContainer add chat const activeChat: ", activeChat)
        // error ** esta instruccion no actualiza state.activeChat //
		setState({...state, chats:newChats, activeChat:activeChat})

		console.log("chatContainer add chat activeChat state before: ", state.activeChat)

		const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
		const typingEvent = `${TYPING}-${chat.id}`

		socket.on(typingEvent, updateTypingInChat(chat.id))
		socket.on(messageEvent, addMessageToChat(chat.id))
		
 	}
 
 	const addMessageToChat = (chatId)=>{
		return message => {
			const { chats } = state
			let newChats = chats.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat
			})

			setState({...state, chats:newChats})		
		}
 	}

 	const updateTypingInChat = (chatId)=> {
		return ({isTyping, user})=>{
			if(user !== props.user.name){

				const { chats } = state

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
						}
					}
					return chat
				})
					setState({...state, chats:newChats})
				
			}
		}

 	}

 	const sendMessage = (chatId, message, isFile)=>{
		const { socket } = props
  		socket.emit(MESSAGE_SENT, {chatId, message, isFile} )
 	}

 	const sendTyping = (chatId, isTyping)=>{
 		const { socket } = props
 		socket.emit(TYPING, {chatId, isTyping})
 	}

 	const setActiveChat = (activeChat)=>{
 		setState({...state, activeChat:activeChat})
 	}
 	
	return (
		
		<div className="container">
		
		{state.showContent === true ?
			<SideBar
				logout={props.logout}
				chats={state.chats}
				user={props.user}
				users={state.users}
				activeChat={state.activeChat}
				setActiveChat={setActiveChat}
				onSendPrivateMessage={sendOpenPrivateMessage}
				/>
				:''}
			<div className="chat-room-container">
			{state.showContent === true ?
				<div className="container">
				{
					
					state.activeChat !== null ? (

						<div className="chat-room">
							<ChatHeading name={state.activeChat.name} />
							<Messages 
								messages={state.activeChat.messages}
								user={props.user}
								typingUsers={state.activeChat.typingUsers}
								/>
							<MessageInput 
								sendMessage={
									(message, isFile)=>{
										sendMessage(state.activeChat.id, message, isFile)
									}
								}
								sendTyping={
									(isTyping)=>{
										sendTyping(state.activeChat.id, isTyping)
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
			<button id="button-chat" onClick={chatButtom}>Chat</button>

		</div>
		
	);
 	
}         

