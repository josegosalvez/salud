import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Find user'></input>
      </div>
      <div className='userChat'>
        <img src='https://images.pexels.com/photos/4277099/pexels-photo-4277099.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'></img>
        <div className='userChatInfo'>
          <span>Jose</span>
        </div>
      </div>
    </div>
  )
}

export default Search