// import React, { Component } from 'react';
// import io from 'socket.io-client'
// import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events'
// import LoginForm from './LoginForm'
// import ChatContainer from './chats/ChatContainer'
// import chatManager from './chatManager'

// const socketUrl = "http://localhost:3231"
// export default class Layout extends Component {
	
// 	constructor(props) {
// 	  super(props);
	
// 	  this.state = {
// 	  	socket:null,
// 	  	user:null
// 	  };
// 	}

// 	componentWillMount() {
// 		this.initSocket()
// 	}

// 	/*
// 	*	Connect to and initializes the socket.
// 	*/
// 	initSocket = ()=>{
// 		const socket = io(socketUrl)

// 		socket.on('connect', ()=>{
// 			if (this.state.user) {
// 				this.reconnect(socket)
// 			}else{
// 				console.log("Connected");
// 			}
// 		})
		
// 		this.setState({socket})
// 	}

// 	reconnect = (socket) => {
// 		socket.emit(VERIFY_USER, this.state.user.name, ({ isUser, user})=>{
// 			if (isUser) {
// 				this.setState({ user: null})
// 			}else{
// 				this.setUser(user)
// 			}
// 		})
// 	}

// 	/*
// 	* 	Sets the user property in state 
// 	*	@param user {id:number, name:string}
// 	*/	
// 	setUser = (user)=>{
// 		const { socket } = this.state
// 		socket.emit(USER_CONNECTED, user);
// 		this.setState({user})
// 	}

// 	/*
// 	*	Sets the user property in state to null.
// 	*/
// 	logout = ()=>{
// 		const { socket } = this.state
// 		socket.emit(LOGOUT)
// 		this.setState({user:null})

// 	}


// 	render() {
// 		const { socket, user } = this.state
		
// 		return (
			
// 			<div className="container">
// 				{
// 					!user ?	
// 					<LoginForm socket={socket} setUser={this.setUser} />
// 					:
// 					<ChatContainer socket={socket} user={user} logout={this.logout}/>
// 				}
// 			</div>
			
// 		);
// 	}
// }

import React, { useState, useEffect   } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'
//import chatManager from './chatManager'

const socketUrl = "http://localhost:3231"

function LayoutFn() {

	const [state, setState] = useState({
		socket: (null),
		user: (null)
	  });

	useEffect(() => {      
        initSocket()
    }, [])

	/*
	*	Connect to and initializes the socket.
	*/
	const initSocket = ()=>{
		const socket = io(socketUrl)

		socket.on('connect', ()=>{
			if (state.user) {
				reconnect(socket)
			}else{
				console.log("Connected");
			}
		})

		setState({...state, socket: socket})
	}

	const reconnect = (socket) => {
		socket.emit(VERIFY_USER, state.user, ({ isUser, user})=>{
			if (isUser) {
				setState({...state, user: null})
			}else{
				setState({...state, user: user})
			}
		})
	}

	/*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/	
	const setUser = (user)=>{
		const { socket } = state
		socket.emit(USER_CONNECTED, user)
		setState({...state, user: user})
	}

	/*
	*	Sets the user property in state to null.
	*/
	const logout = ()=>{
		const { socket } = state
		socket.emit(LOGOUT)
		setState({...state, user: null})
	}

	return (

		<div className="container">
			{
				!state.user ?	
				<LoginForm socket={state.socket} setUser={setUser} />
				:
				<ChatContainer socket={state.socket} user={state.user} logout={logout}/>
			}
		</div>

	);

}
export default (LayoutFn);