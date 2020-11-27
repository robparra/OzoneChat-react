import React, { useState } from 'react'
import PropTypes from 'prop-types'

const withSideBarOption = Component => props => {

    withSideBarOption.propTypes = {
        name: PropTypes.string.isRequired,
        lastMessage: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func
}

withSideBarOption.defaultProps = {
        lastMessage: "",
        active:(false),
    }

    const onClock= () => { }

    const actionsSideBarOption = {
        onClock
    }

    return ( < Component { ...actionsSideBarOption} { ...props}/>
    	)
}

export default (withSideBarOption)