import { useState, useEffect } from 'react'
// import { Link, Outlet } from "react-router-dom";
import { userService } from '../services/userService'
import { useNavigate} from 'react-router-dom'
// import { bitcoinService } from '../services/bitcoinService'
import signupImage from '../assets/imgs/signup.avif';

export function SignUp() {

    const [loggedInUser, setLoggedInUser] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    // useEffect(() => {
    //     // console.log()
    //     loadUser()
    // }, [])

    async function loadUser() {
        try {
            setLoggedInUser(userService.getEmptyUser())
            
        } catch (error) {
            console.log('error:', error)
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        setLoggedInUser(prevUser => ({
            ...prevUser,
            [field]: value
        }))
    }

    async function onSaveUser(ev) {
        ev.preventDefault()
        try {
            await userService.signup(loggedInUser)
            navigate('/')

        } catch (error) {
        }
    }
    // if(!contact) return
    const { name } = loggedInUser
    return (
        <section className="signup-page">
            <img className='signup-img' src={signupImage}/>
            <h1>Please enter your name:</h1>
            <form className='form' onSubmit={onSaveUser} >
                {/* <label htmlFor="name">Username</label> */}
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />
                <button className='btn signup-btn'>Sign up</button>
            </form>
        </section>
    )
}
