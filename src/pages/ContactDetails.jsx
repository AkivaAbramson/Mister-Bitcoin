import { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function ContactDetails() {
    const [contact, setContact] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContact()
    }, [params.id])

    async function loadContact() {
        try {
            const contact = await contactService.getById(params.id)
            setContact(contact)
        } catch (error) {
            console.log('error:', error)
        }
    }
    
    function onBack() {
        navigate('/contact')
    }

    if (!contact) return <div>Loading...</div>
    return (
        <section className='contact-details'>
            <section>
                <h3>Name: {contact.name}</h3>
            </section>
            <section>
                <h3>Email: {contact.email}</h3>
            </section>
            <section>
                <h3>Phone: {contact.phone}</h3>
            </section>
            <img src={`https://robohash.org/${contact.name}.png?set=set5`} />
            <button className='btn' onClick={onBack}>Back</button>
            <Link className='clean btn-edit' to={`/contact/edit/${params.id}`} >Edit Contact</Link>
        </section>
    )
}
