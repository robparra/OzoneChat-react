import React, {  useState, useEffect } from 'react';
 import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, 
 				TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED,
 				NEW_CHAT_USER } from '../../Events'
 import { values, difference, differenceBy } from 'lodash'

 
const withChatContainer = Component => props => {
    	
	const[state, setState]=useState({
		chats:[],
 		users:[],
 	  	activeChat: null,
 	  	showContent:true,
	})

 	const chatButtom = (event)=>{ 
		event.preventDefault()
		//  setState({...state, showContent:!state.showContent})
		  setState(state => {	return {...state, showContent:!state.showContent}	})
 	}

	useEffect(() => {   
		 
		const { socket } = props
		initSocket(socket)
		return () => {
		
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
		//	setState({...state, users: values(users)})
			setState(state => {	return {...state, users: values(users)}	})
		})
		socket.on(USER_DISCONNECTED, (users)=>{
			const removedUsers = differenceBy( state.users, values(users), 'id')
			removeUsersFromChat(removedUsers)
			//setState({...state, users: values(users) })	
			setState(state => {	return {...state, users: values(users)}	})
				
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
	//	setState({...state, chats:newChats })
		console.log('addUserToChat value: ', newChats)
		setState(state => {	return {...state, chats:newChats}	})
	 }
	 
 	const removeUsersFromChat = (removedUsers) => {
		const { chats } = state
		const newChats = chats.map( chat => {
			let newUsers = difference( chat.users, removedUsers.map( u => u.name ) )
				return Object.assign({}, chat, { users: newUsers })
		})
	//	setState({...state, chats: newChats })
	    console.log('removeUsersFromChat value: ', newChats)
		setState(state => {	return {...state, chats:newChats}	})
 	}

 	const resetChat =  (chat)=>{
 		return addChat(chat, true)
	 }
	 

 	const addChat = (chat, reset = false)=>{
		const { socket } = props		
		const { chats} = state

		const newChats = reset ? [chat] : [...chats, chat]   
		const newActiveChat = reset ?  chat : state.activeChat 
		 
	//	setState({...state, chats:newChats, activeChat:newActiveChat})
		setState(state => {	return {...state,  chats:newChats, activeChat:newActiveChat}})
		
		console.log("state after: ", state)
	
		const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
		const typingEvent = `${TYPING}-${chat.id}`

		socket.on(typingEvent, updateTypingInChat(chat.id))
		socket.on(messageEvent, addMessageToChat(chat.id))
		
	 }
	   
 
 	const addMessageToChat = (chatId)=>{
		
		return message => {
			const { chats } = state
			console.log("addMessageToChat chats: ", chats)
			let newChats = chats.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat
			})

		//	setState({...state, chats:newChats})
		console.log("addMessageToChat newChats: ", newChats) 
			setState(state => {	return {...state, chats:newChats}	})		
		}
 	}

 	const updateTypingInChat = (chatId)=> {
		console.log("updateTypingChat: ", chatId)
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
				//	setState({...state, chats:newChats})
				
					setState(state => {	return {...state, chats:newChats}	})
				
			}
		}

 	}

 	const sendMessage = (chatId, message, isFile)=>{
		 console.log("snedMessage: ", chatId, message, isFile)
		const { socket } = props
  		socket.emit(MESSAGE_SENT, {chatId, message, isFile} )
 	}

 	const sendTyping = (chatId, isTyping)=>{
 		const { socket } = props
 		socket.emit(TYPING, {chatId, isTyping})
 	}

 	const setActiveChat = (activeChat)=>{
		
		// setState({...state, activeChat: activeChat})
		 setState(state => {	return {...state, activeChat:activeChat}	})
		 
	 }
	 
	
	 console.log("chatContainer states: ", state)

    const chatContainerActions = {
        chatButtom,
        sendMessage,
		sendTyping,
		setActiveChat,
		sendOpenPrivateMessage
    }

    return (
        <Component {...chatContainerActions} {...state}{...props} />
    )
}


export default (withChatContainer);