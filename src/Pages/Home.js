import React from 'react'
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div> This is the Home component
    <h1>Home</h1>
    <Link
  to={{
    pathname: '/Edit/' + 1,
  }}
>link</Link>
    </div>
  )
}
