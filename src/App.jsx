import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import './assets/scss/global.scss'
import { ContactIndex } from './pages/ContactIndex'
import { HomePage } from './pages/HomePage'
import { SignUp } from './pages/SignUp'
import { AppHeader } from './cmps/AppHeader'
import { Stats } from './pages/Stats'
import { ContactDetails } from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'

function RouteGuard({ children }) {
    const isLoggedIn = true
    if (!isLoggedIn) return <Navigate to="/contact" />
    return <>{children}</>
}

function App() {

    return (
        <Router>

            <section className="main-app">

                <AppHeader />

                <main className="container">
                    <Routes>
                        <Route path='/contact/:id' element={
                            <RouteGuard>
                                <ContactDetails/>
                            </RouteGuard>
                        }/>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/contact' element={<ContactIndex/>}/>
                        <Route path='/about' element={<Stats/>}/>
                        <Route path='contact/edit/:id?' element={<ContactEdit />} />
                    </Routes>
                </main>

                <footer>
                    <section >
                        Akiva Abramson 2023 &copy;
                    </section>
                </footer>

            </section>
        </Router>
    )
}

export default App
