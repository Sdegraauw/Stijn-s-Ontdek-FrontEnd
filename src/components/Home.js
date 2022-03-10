import React from 'react'
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <div>
    <h1>Home</h1>
    <Link to='about'>Click here to view about</Link>
    <Link to='login'>Click here to view Login</Link>
    </div>
  )
}
