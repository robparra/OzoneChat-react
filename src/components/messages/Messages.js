import React, { Component } from 'react';
import boton from '../boton';

export default class Messages extends Component {
	constructor(props) {
	  super(props);
	  this.chatButtom = this.chatButtom.bind(this)
		
		this.scrollDown = this.scrollDown.bind(this)
		this.state = {
			showContent:true
		}
	}

	chatButtom(event){
		event.preventDefault()
		this.setState({
			showContent:!this.state.showContent
		})
	}

	scrollDown(){
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}

	componentDidMount() {
		this.scrollDown()
	}

	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}
	
	render() {
		const { messages, user, typingUsers } = this.props
		const {showContent} = this.state
		return (
			<div ref='container'
				className="thread-container">
				{showContent === true ?
				<div className="thread">
					{
						messages.map((mes)=>{
							return (
								<div
									key={mes.id}
									className={`message-container ${mes.sender === user.name && 'right'}`}
								>
									<div className="time">{mes.time}</div>
									<div className="data">
										<div className="message">{mes.message}</div>
										<div className="name">{mes.sender}</div>
									</div>
								</div>

								)
						})
					}
					{
						typingUsers.map((name)=>{
							return (
								<div key={name} className="typing-user">
									{`${name} is typing . . .`}
								</div>
							)
						})
					}
				</div>
           :''}
			</div>
		);
	}
}
