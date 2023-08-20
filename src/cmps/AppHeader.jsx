import { Link, NavLink } from "react-router-dom"
import { useState, useEffect } from 'react'
import { userService } from '../services/userService'
import {Sidebar} from "./Sidebar"

export function AppHeader() {
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
      <NavLink to="/" className="logo clean">
        <h1>
          Mister<span className="fw-bold clr-teal">Bitcoin</span>
        </h1>
      </NavLink>
      <div className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </div>
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
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  )
}