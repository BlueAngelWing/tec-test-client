import React, { useState } from 'react'
import { useDispatch } from 'react-redux'


const Header = () => {
  const [status,setStatus] = useState('idle')


  let isLoading = status === 'loading'
  let loader = isLoading ? <div className="loader" /> : null

  return (
    
      <header className="header">
        {loader}
      </header>
    
    
  )
}

export default Header
