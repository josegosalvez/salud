import React from 'react'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <span className='logo'>Chat name?</span>
        <div className='user'>
            <img src='https://images.pexels.com/photos/4277099/pexels-photo-4277099.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''></img>
            <span>Jose</span>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Navbar