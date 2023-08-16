import { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactDetails } from './ContactDetails'

export function ContactIndex() {

    const [contacts, setContacts] = useState(null)
    const [selectedContactId, setSelectedContactId] = useState(null)
    const [filterBy, setFilterBy] = useState({
        name:''
    })

    useEffect(() => {
        loadContacts()
    }, [filterBy])

    async function loadContacts() {
        const contacts = await contactService.query(filterBy)
        setContacts(contacts)
    }

    async function onRemoveContact(contactId) {
        try {
            await contactService.remove(contactId)
            loadContacts()
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onChangeFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onSelectContactId(contactId) {
        setSelectedContactId(contactId)
    }


    if (!contacts) return <div>Loading...</div>
    return (
        <section className="contact-index">
                    <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
                    <ContactList onSelectContactId={onSelectContactId} contacts={contacts} onRemoveContact={onRemoveContact} />
        </section>
    )
}
