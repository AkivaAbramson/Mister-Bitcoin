
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { userService } from '../services/userService'
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function MovesList(props) {
    const [user, setUser] = useState(userService.getLoggedinUser())
    const [contact, setContact] = useState(props.contact)

    useEffect(() => {
        console.log(user)
        console.log(contact);
        // loadUser()
        // console.log(user)
    }, [user])

    // useEffectUpdate(() => {
    //     // loadUser()
    //     console.log(user);

    // }, [user.moves])

    async function loadUser() {
        const loadedUser = await userService.get(user._id)
        setUser(loadedUser)
    }

    return (
        <section className="moves-list">
            <h1 className='moves-title'>Your Moves</h1>
            {user?.moves
                .filter(move => move.toId === contact._id)
                .length > 0 ? (
                user.moves
                    .filter(move => move.toId === contact._id)
                    .map((move, index) => (
                        <div key={index}>
                            <div className='move-info'>
                                <p>At: {new Date(move.at).toLocaleString()}</p>
                                <p>Amount: {move.amount}</p>
                            </div>
                        </div>
                    ))
            ) : (
                <h1>No Transfers to {contact.name} yet...</h1>
            )}
        </section>


    )
}
