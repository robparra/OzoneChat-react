// import React, { Component } from 'react';

// export default class Messages extends Component {
// 	constructor(props) {
// 	  super(props);
		
// 		this.scrollDown = this.scrollDown.bind(this)
// 	}

// 	scrollDown(){
// 		const { container } = this.refs
// 		container.scrollTop = container.scrollHeight
// 	}

// 	componentDidMount() {
// 		this.scrollDown()
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		this.scrollDown()
// 	}
	
// 	render() {
// 		const { messages, user, typingUsers } = this.props
// 		return (
// 			<div ref='container'
// 				className="thread-container">
// 				<div className="thread">
// 					{
// 						messages.map((mes)=>{
// 							return (
// 								<div
// 									key={mes.id}
// 									className={`message-container ${mes.sender === user.name && 'right'}`}
// 								>
// 									<div className="time">{mes.time}</div>
// 									<div className="data">

// 									<div className="message">
// 									{
// 										mes.isFile ?
// 										<img src={mes.message} style={{width:55, height:55}}/>
// 										:
// 										mes.message
// 									}
										
// 									</div>	
										
// 										<div className="name">{mes.sender}</div>
// 									</div>
// 								</div>

// 								)
// 						})
// 					}
// 					{
// 						typingUsers.map((name)=>{
// 							return (
// 								<div key={name} className="typing-user">
// 									{`${name} is typing . . .`}
// 								</div>
// 							)
// 						})
// 					}
// 				</div>


// 			</div>
// 		);
// 	}
// }


// import React, { useState, useEffect, useRef } from 'react';

// function MessagesFn(props){

// 	const inputRef = useRef(null);

// 	const scrollDown = () =>{
// 		const { container } = inputRef
// 		// container.scrollTop = container.scrollHeight
// 	}



// 	useEffect(() => {      
//         scrollDown()
//     }, [])

//     useEffect((prevProps, prevState) => {      
//         scrollDown()
//     }, [])

//     return(
// 			<div ref={inputRef}
// 				className="thread-container">
// 				<div className="thread">
// 					{
// 						props.messages.map((mes)=>{
// 							return (
// 								<div
// 									key={mes.id}
// 									className={`message-container ${mes.sender === props.user.name && 'right'}`}
// 								>
// 									<div className="time">{mes.time}</div>
// 									<div className="data">

// 									<div className="message">
// 									{
// 										mes.isFile ?
// 										<img src={mes.message} style={{width:55, height:55}}/>
// 										:
// 										mes.message
// 									}
										
// 									</div>	
										
// 										<div className="name">{mes.sender}</div>
// 									</div>
// 								</div>

// 								)
// 						})
// 					}
// 					{
// 						props.typingUsers.map((name)=>{
// 							return (
// 								<div key={name} className="typing-user">
// 									{`${name} is typing . . .`}
// 								</div>
// 							)
// 						})
// 					}
// 				</div>


// 			</div>
// 		);

// }

// export default (MessagesFn);

import React, { useState, useEffect, useRef } from 'react';
import withMessages from "./withMessages";

const Messages = props =>{
	return (
			<div ref={props.inputRef}
				className="thread-container">
				<div className="thread">
					{
						props.messages.map((mes)=>{
							return (
								<div
									key={mes.id}
									className={`message-container ${mes.sender === props.user.name && 'right'}`}
								>
									<div className="time">{mes.time}</div>
									<div className="data">

									<div className="message">
									{
										mes.isFile ?
										<img src={mes.message} style={{width:55, height:55}}/>
										:
										mes.message
									}
										
									</div>	
										
										<div className="name">{mes.sender}</div>
									</div>
								</div>

								)
						})
					}
					{
						props.typingUsers.map((name)=>{
							return (
								<div key={name} className="typing-user">
									{`${name} is typing . . .`}
								</div>
							)
						})
					}
				</div>


			</div>
		);
}
export default (withMessages(Messages));