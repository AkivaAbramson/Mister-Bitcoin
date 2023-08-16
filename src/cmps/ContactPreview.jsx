
import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact, onRemoveContact}) {

    // const contactStyle = { backgroundImage: `url(https://robohash.org/${contact._id})` }
    return (
        <article className='contact-preview'>
            <Link to={`/contact/${contact._id}`} className="info clean">
                <img src={`https://robohash.org/${contact.name}.png?set=set5`} alt="" />
                <h2 className='contact-name'>{contact.name}</h2>
            </Link>
            <section className="actions">
                <button className="btn" onClick={(e) => { e.stopPropagation(); onRemoveContact(contact._id); }}>X</button>
                <Link className='clean btn-edit' to={`/contact/edit/${contact._id}`} >Edit</Link>
            </section>
        </article>
    )
}
