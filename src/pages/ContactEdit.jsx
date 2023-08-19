import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { useNavigate, useParams } from 'react-router-dom'


export function ContactEdit(props) {

    const [contact, setContact] = useState(contactService.getEmptyContact())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // console.log()
        loadContact()
    }, [])

    async function loadContact() {
        const contactId = params.id
        try {
            if (contactId) {
                const contact = await contactService.getById(contactId)
                setContact(contact)
            }
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

        setContact(prevContact => ({
            ...prevContact,
            [field]: value
        }))
    }

    async function onSaveContact(ev) {
        ev.preventDefault()
        try {
            await contactService.save(contact)
            navigate('/contact')
        } catch (error) {
        }
    }


    const { name, email, phone } = contact
    return (
        <section className='contact-edit'>
            <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
            <form className='edit-form' onSubmit={onSaveContact} >
                <div className='input-wrapper'>
                <label htmlFor="name">Name: </label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />
                </div>
                <div className='input-wrapper'>
                <label htmlFor="phone">Phone:</label>
                <input onChange={handleChange} value={phone} type="text" name="phone" id="phone" />
                </div>

                <div className='input-wrapper'>
                <label htmlFor="email">Email: </label>
                <input onChange={handleChange} value={email} type="text" name="email" id="email" />
                </div>

                <button className='edit-save'>Save</button>
            </form>
        </section>
    )
}