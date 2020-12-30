import React, { useState, useEffect, useRef } from 'react';
import { Smile } from 'react-feather';
import { Picker } from 'emoji-mart';


const withMessageInput = Components => props =>{
	const[state, setState]=useState({
		message:"",
	  	isTyping:false,
	  	selectedFile:null,
	  	isFile:false,
	  	showEmojiPicker: false,
	})

	const toggleEmojiPicker=()=> {
		setState(state => {	return {...state, showEmojiPicker:!state.showEmojiPicker}	})
    }

    const addEmoji=(emoji)=> {
      const { message } = state;
      const text = `${message}${emoji.native}`;

      setState({...state,
        message: text,
        showEmojiPicker: false,
      });
    }

	const inputRef = useRef(null);

	const handleChange = (e)=>{	
		setState({...state, message:e.target.value})
	}
	    
	const handleSubmit = (e) =>{
		e.preventDefault()
		sendMessage()
		setState({...state, message:""})
	}

	const sendMessage = () =>{
		props.sendMessage(state.message, state.isFile, state.addEmoji)
	}

	useEffect(() => {      
		return () => {
			stopCheckingTyping()        }
    }, [])

    const sendTyping = () =>{
    	const lastUpdateTime = Date.now()
		if(!state.isTyping){
			setState({...state, isTyping:true})
			props.sendTyping(true)
			startCheckingTyping(lastUpdateTime)
		}
    }

    const startCheckingTyping = (lastUpdateTime) =>{
    	const typingInterval = setInterval(()=>{
			if((Date.now() - lastUpdateTime) > 300){
				setState({...state, isTyping:false})
				stopCheckingTyping(typingInterval)
			}
		}, 300)
    }

    const stopCheckingTyping = (typingInterval) =>{
    	if(typingInterval){
			clearInterval(typingInterval)
			props.sendTyping(false)
		}
    }

    const onFileChange = (event) =>{
		const newSeletedFile = URL.createObjectURL(event.target.files[0])
		setState(state =>  { return {...state,  selectedFile:newSeletedFile, isFile:true}}) 
    }

    const onFileUpload = () =>{
    	props.sendMessage(state.selectedFile, state.isFile)
		setState(state =>  { return {...state,  selectedFile:"", isFile:false}})
    }


    const actionsMessageInput = {
		inputRef,
		handleChange,
    	handleSubmit,
    	sendMessage,
    	sendTyping,
    	startCheckingTyping,
    	stopCheckingTyping,
    	onFileChange,
    	onFileUpload,
    	toggleEmojiPicker,
    	addEmoji
    }

    return ( < Components { ...actionsMessageInput} {...state} { ...props}/>
    	)
}

export default (withMessageInput)