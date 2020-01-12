import React from 'react'
import '../App.css'

const Nav = () => {
  return (
    <nav>
        <h1>
          <a href='/'>Matcha</a>
          <form action="/logout" method='POST'>
            <button>logout</button>
          </form>
        </h1>
    </nav>
  )
}

export default Nav