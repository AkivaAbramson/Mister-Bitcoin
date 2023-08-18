import { Link, NavLink } from "react-router-dom"
import { useState, useEffect } from 'react'
import { userService } from '../services/userService'

export function AppHeader() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadUser()
  }, [user])

  async function loadUser() {
    const currUser = await userService.getLoggedinUser()
    setUser(currUser)
  }

  async function onLogout() {
    await userService.logout()

  }

  return (
    <header className="app-header flex justify-between items-center">
      <h1 className="logo">
        Mister<span className="fw-bold clr-teal">Bitcoin</span>
      </h1>
      {/* <NavLink className="logo">
        Mister<span className="fw-bold clr-teal">Bitcoin</span>
      </NavLink> */}
      <nav className="nav flex gap-2">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/contact" className="link">
          Contacts
        </NavLink>
        <NavLink to="/about" className="link">
          About
        </NavLink>
        {!user && <NavLink to="/signup" className="link">
          Sign Up
        </NavLink>}
        {user && <NavLink to="/signup" className="link" onClick={onLogout}>
          Log Out
        </NavLink>}

      </nav>
    </header>
  )
}
