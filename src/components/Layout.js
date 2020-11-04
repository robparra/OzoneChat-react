/*   import React, { Component } from 'react';
 import io from 'socket.io-client'
 import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events'
 import LoginForm from './LoginForm'
 import ChatContainer from './chats/ChatContainer'
 import chatManager from './chatManager'

 const socketUrl = "http://localhost:3231"
 export default class Layout extends Component {
	
 	constructor(props) {
 	  super(props);
	
 	  this.state = {
 	  	socket:null,
 	  	user:null
 	  };
 	}

 	componentWillMount() {
 		this.initSocket()
 	}

 	initSocket = ()=>{
 		const socket = io(socketUrl)

 		socket.on('connect', ()=>{
 			if (this.state.user) {
 				this.reconnect(socket)
 			}else{
 				console.log("Connected");
 			}
 		})
		
		 this.setState({socket})
		 console.log("layout state socket: ", this.state.socket)
 	}

 	reconnect = (socket) => {
 		socket.emit(VERIFY_USER, this.state.user.name, ({ isUser, user})=>{
 			if (isUser) {
 				this.setState({ user: null})
 			}else{
 				this.setUser(user)
 			}
 		})
 	}

 	setUser = (user)=>{
 		const { socket } = this.state
 		socket.emit(USER_CONNECTED, user);
		 this.setState({user})
		 console.log("layout state user: ", this.state.user)
 	}

 	logout = ()=>{
 		const { socket } = this.state
 		socket.emit(LOGOUT)
 		this.setState({user:null})

 	}


 	render() {
 		const { socket, user } = this.state
		
 		return (
			
 			<div className="container">
 				{
 					!user ?	
 					<LoginForm socket={socket} setUser={this.setUser} />
 					:
 					<ChatContainer socket={socket} user={user} logout={this.logout}/>
 				}
 			</div>
			
 		);
 	}
 } 
   */
   import React, { useState, useEffect } from 'react';
 import io from 'socket.io-client'
 import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events'
 import LoginForm from './LoginForm'
 import ChatContainer from './chats/ChatContainer'
 import chatManager from './chatManager'

 const socketUrl = "http://localhost:3231"
 export default function Layout () {

 	const[state, setState]=useState({
		socket:null,
 	  	user:null
	})

	useEffect(() => {      
        initSocket()
	}, [])
	
 	const initSocket = ()=>{
 		const socket = io(socketUrl)

 		socket.on('connect', ()=>{
 			if (state.user) {
 				reconnect(socket)
 			}else{
 				console.log("Connected");
 			}
 		})
		
		 setState({...state, socket:socket})
		
 	}

 	const reconnect = (socket) => {
 		socket.emit(VERIFY_USER, state.user.name, ({ isUser, user})=>{
 			if (isUser) {
				 setState({...state, user: null})
				 console.log("Layout reconnet: ", state.user)
 			}else{
 				setUser(user)
 			}
 		})
 	}

 	const setUser = (user)=>{
 		const { socket } = state
 		socket.emit(USER_CONNECTED, user);
		 setState({...state, user:user})
		
 	}

 	const logout = ()=>{
 		const { socket } = state
 		socket.emit(LOGOUT)
 		setState({...state, user:null})

	 }
	 
	const { socket, user } = state

	return (
		
		<div className="container">
			{
				!user ?	
				<LoginForm socket={socket} setUser={setUser} />
				:
				<ChatContainer socket={socket} user={user} logout={logout}/>
			}
		</div>
		
	);
 	
 } 
 
  