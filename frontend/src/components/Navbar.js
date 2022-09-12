import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='nav-container'>
        <div className='nav'>
            <Link to='/'><h2>Home</h2></Link>
        </div>
    </div>
  )
}
