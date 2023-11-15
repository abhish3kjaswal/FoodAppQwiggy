import React from 'react'

//Higher order components takes a components 
//and returns a component

const ResCardHOC = (Comp) => {

    return (props) => {
        let ab = "true";

        return <Comp {...props} ab={ab} />
    }
}

export default ResCardHOC
