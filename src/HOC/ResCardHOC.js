import React from 'react'

const ResCardHOC = (Comp) => {

    console.log("HOC-->")
    return (props) => {
        let ab = true;

        return <Comp {...props} ab={ab} />
    }
}

export default ResCardHOC