// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

// export default class SideBarOption extends PureComponent {
//     static propTypes = {
//         name: PropTypes.string.isRequired,
//         lastMessage: PropTypes.string,
//         active: PropTypes.bool,
//         onClick: PropTypes.func
//     }
//     static defaultProps = {
//         lastMessage: "",
//         active:false,
//         onClock: () => { }
//     }
//     render() {
//         const { active, lastMessage, name, onClick } = this.props
//         return (
//             <div 
//                 className={`user ${active ? 'active':''}`}
//                 onClick={onClick}
//                 >
//                 <div className="user-photo">{name[0].toUpperCase()}</div>
//                 <div className="user-info">
//                     <div className="name">{name}</div>
//                     <div className="last-message">{lastMessage}</div>
//                 </div>
                
//             </div>
//         )
//     }
// }


// import React, { useState } from 'react'
// import PropTypes from 'prop-types'

// function SideBarOptionFn(props){
// SideBarOptionFn.propTypes = {
//         name: PropTypes.string.isRequired,
//         lastMessage: PropTypes.string,
//         active: PropTypes.bool,
//         onClick: PropTypes.func
// }

// SideBarOptionFn.defaultProps = {
//         lastMessage: "",
//         active:(false),
//     }

//     const onClock= () => { }
    

//     return(
//             <div 
//                 className={`user ${props.active ? 'active':''}`}
//                 onClick={props.onClick}
//                 >
//                 <div className="user-photo">{props.name[0].toUpperCase()}</div>
//                 <div className="user-info">
//                     <div className="name">{props.name}</div>
//                     <div className="last-message">{props.lastMessage}</div>
//                 </div>
                
//             </div>
//         );
// }




// export default (SideBarOptionFn);

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import withSideBarOption from "./withSideBarOption";

const SideBarOption = props => {
    return (
            <div 
                className={`user ${props.active ? 'active':''}`}
                onClick={props.onClick}
                >
                <div className="user-photo">DM w/</div>
                <div className="user-info">
                    <div className="name">{props.name}</div>
                    <div className="last-message">{props.lastMessage}</div>
                </div>
                
            </div>
        )
}
export default (withSideBarOption(SideBarOption));

// 