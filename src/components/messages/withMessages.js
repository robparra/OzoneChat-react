import React, { useState, useEffect, useRef } from 'react';

const withMessages = Component => props =>{
	const inputRef = useRef(null);

	const scrollDown = () =>{
		const { container } = inputRef
		// container.scrollTop = container.scrollHeight
	}

	useEffect(() => {      
        scrollDown()
    }, [])

    useEffect((prevProps, prevState) => {      
        scrollDown()
    }, [])

	const actionsMessages = {
		scrollDown, 
	}

	return ( < Component { ...actionsMessages} { ...props}/>
    	)
}

export default (withMessages)
