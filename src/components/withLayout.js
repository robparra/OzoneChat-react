import React, { useState, useEffect   } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events'

const socketUrl = "http://localhost:3231"

const withLayout = Component => props =>{

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
	const initSocket = () =>{
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

	const layoutActions = {
		socketUrl,
		setUser,
		logout
    }

	return (
        <Component {...layoutActions} {...state} {...props} />
	);

}
export default (withLayout);