import { Link, NavLink } from "react-router-dom"

export function AppHeader() {
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
      </nav>
    </header>
  )
}
