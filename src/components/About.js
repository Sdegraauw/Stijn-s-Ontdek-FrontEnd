import React from 'react'
import {Link} from 'react-router-dom'
export default function About() {
  return (
    <div>
    <h1>About</h1>
    <Link to='home'>Click here to view home</Link>
    <Link to='login'>Click here to view login</Link>
    </div>
  )
}
