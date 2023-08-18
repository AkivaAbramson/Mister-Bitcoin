
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { userService } from '../services/userService'
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function TransferFund(props) {
    const [contact, setContact] = useState(props.contact)
    const [coins, setCoins] = useState('')
    const [user, setUser] = useState(userService.getLoggedinUser())

    useEffect(() => {
        updateContact()
        
    }, [contact])
    
    useEffectUpdate(() => {
        addMove()
        // console.log();
        
    }, [contact])

    // useEffect(() => {
    //     loadUser()
    // }, [user])

    async function loadUser() {
        const currUser = await userService.getLoggedinUser()
        setUser(currUser)
    }

    async function addMove(){
        const move = await userService.getEmptyMove()
        move['toId'] = contact._id
        move['to'] = contact.name
        move['amount'] = coins
        // console.log(user);
        const updatedUser = {...user}
        // console.log(updatedUser);
        if(updatedUser.coins < coins){
            alert('Sorry, not enough coins in your balance!')
            return
        } 
        updatedUser.coins -= coins
        updatedUser.moves.unshift(move)
        setUser(updatedUser)
        await userService.save(updatedUser)
        await userService.saveLocalUser(updatedUser)
        setCoins('')

    }

    async function updateContact() {
        await contactService.save(contact)
        // console.log(contact)
    }

    function handleChange({ target }) {
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
        setCoins(value)
    }

    function onTransfer(ev) {
        ev.preventDefault()
        setContact(prevContact => ({
            ...prevContact,
            ["coins"]: prevContact.coins + coins
        }))
        
    }


    // const {coins} = contact
    return (
        <section className='transfer-fund'>
            <h1>Transfer coins to {contact.name}:</h1>
            <form onSubmit={onTransfer}>
                <label htmlFor="coins">Amount: </label>
                <input onChange={handleChange} value={coins} type="number" name="coins" id="coins" />
                <button className='btn transfer-btn' type="submit">Transfer</button>
            </form>
        </section>
    )
}
 