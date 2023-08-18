import { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TransferFund } from '../cmps/TransferFund'
import { MovesList } from '../cmps/MovesList'

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
            <div className='details-info'>
                <img className='details-img' src={`https://robohash.org/${contact.name}.png?set=set5`} />
                <section className='details-data'>
                    <h3>Name: <span className='gray'>{contact.name}</span></h3>
                    <h3>Email: <span className='gray'>{contact.email}</span></h3>
                    <h3>Phone: <span className='gray'>{contact.phone}</span></h3>
                </section>

            </div>
            <TransferFund contact={contact} />
            <MovesList contact={contact} />
            <div className='actions'>
                <button className='btn' onClick={onBack}>Back</button>
                <Link className='clean btn-edit btn' to={`/contact/edit/${params.id}`} >Edit Contact</Link>
            </div>
        </section>
    )
}
