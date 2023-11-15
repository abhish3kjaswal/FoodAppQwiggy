import React, { useEffect, useState } from 'react'

const Contact = () => {
  const [val, setVal] = useState("")

 useEffect(() => {

  
  return () => {
    
  };
 }, [val]);

  return (
    <div>Contact

      <div>
        <input type='text' placeholder='search' onChange={(e) => setVal(e?.target?.value)} />
        <h2>{val}</h2>
      </div>
    </div>
  )
}

export default Contact