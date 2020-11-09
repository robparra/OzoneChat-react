import React, {   } from 'react';
import SideBar from '../sidebar/SideBar'
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'
import withChatContainer from './withChatContainer';

 const ChatContainerNew = props => {

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

 export default (withChatContainer(ChatContainerNew));