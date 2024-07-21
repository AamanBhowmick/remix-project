import React from 'react'
import { NavLink } from '@remix-run/react'

const MainNavigation = () => {
  return (
    <div>
      <nav id='main-navigation'>
        <ul>
            <li className='nav-item'>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to={"/notespage"}>My Notes</NavLink>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default MainNavigation
