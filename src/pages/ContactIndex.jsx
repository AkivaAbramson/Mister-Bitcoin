import { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactDetails } from './ContactDetails'
import { useNavigate} from 'react-router-dom'
import { userService } from '../services/userService'

export function ContactIndex() {

    const [contacts, setContacts] = useState(null)
    const [selectedContactId, setSelectedContactId] = useState(null)
    const [filterBy, setFilterBy] = useState({
        name:''
    })
    const navigate = useNavigate()

    useEffect(() => {
        loadContacts()
    }, [filterBy])

    async function loadContacts() {
        const currUser = await userService.getLoggedinUser()
        if(!currUser){
            navigate('/signup')
        }
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
