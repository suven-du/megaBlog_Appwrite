import React from 'react'
import blog from '../assets/icons8-blog.svg'

function Logo({width}) {
  return (
    <div width={width='100px'}>
      <img src={blog} alt="" />
    </div>
  )
}

export default Logo
