import React, { useState, useEffect, useRef } from 'react';
import MdFileUpload from 'react-icons/lib/md/file-upload'
import MdBook from 'react-icons/lib/md/book'

const withMessageInput = Components => props =>{
	const[state, setState]=useState({
		message:"",
	  	isTyping:false,
	  	selectedFile:null,
	  	isFile:false
	})

	const inputRef = useRef(null);
	    
	const handleSubmit = (e) =>{
		e.preventDefault()
		sendMessage()
		setState({...state, message:""})
	}

	const sendMessage = () =>{
		props.sendMessage(state.message, state.isFile)
	}

	useEffect(() => {      
		return () => {
			stopCheckingTyping()
        }
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
	//	setState({...state, isFile:false})
	//	setState({...state, selectedFile:""})
		setState(state =>  { return {...state,  selectedFile:"", isFile:false}})
    }


    const actionsMessageInput = {
    	handleSubmit,
    	sendMessage,
    	sendTyping,
    	startCheckingTyping,
    	stopCheckingTyping,
    	onFileChange,
    	onFileUpload
    }

    return ( < Components { ...actionsMessageInput} {...state} { ...props}/>
    	)
}

export default (withMessageInput)