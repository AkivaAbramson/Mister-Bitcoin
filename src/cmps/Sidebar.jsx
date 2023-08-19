import React from 'react'
import { NavLink } from 'react-router-dom'

export function Sidebar({ isOpen, onClose }) {
  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/contact', text: 'Contacts' },
    { to: '/about', text: 'About' },
    { to: '/signup', text: 'Sign up' },
    // Add more links as needed
  ]

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {navLinks.map(link => (
        <NavLink key={link.to} to={link.to} onClick={onClose}>
          {link.text}
        </NavLink>
      ))}
    </div>
  )
}