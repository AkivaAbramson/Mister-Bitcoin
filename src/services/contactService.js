import { storageService } from './storageService.js'
import { makeId } from './utilService.js'

export const contactService = {
    query,
    save,
    remove,
    getById,
    getEmptyContact,
    tryContact
}

const STORAGE_KEY = 'contacts'

const gDefaultContacts = [
    {
      _id: '5a56640269f443a5d64b32ca',
      name: 'Ochoa Hyde',
      email: 'ochoahyde@renovize.com',
      phone: '+1 (968) 593-3824',
      coins: 0
    },
    {
      _id: '5a5664025f6ae9aa24a99fde',
      name: 'Hallie Mclean',
      email: 'halliemclean@renovize.com',
      phone: '+1 (948) 464-2888',
      coins: 0
    },
    {
      _id: '5a56640252d6acddd183d319',
      name: 'Parsons Norris',
      email: 'parsonsnorris@renovize.com',
      phone: '+1 (958) 502-3495',
      coins: 0
    },
    {
      _id: '5a566402ed1cf349f0b47b4d',
      name: 'Rachel Lowe',
      email: 'rachellowe@renovize.com',
      phone: '+1 (911) 475-2312',
      coins: 0
    },
    {
      _id: '5a566402abce24c6bfe4699d',
      name: 'Dominique Soto',
      email: 'dominiquesoto@renovize.com',
      phone: '+1 (807) 551-3258',
      coins: 0
    },
    {
      _id: '5a566402a6499c1d4da9220a',
      name: 'Shana Pope',
      email: 'shanapope@renovize.com',
      phone: '+1 (970) 527-3082',
      coins: 0
    },
    {
      _id: '5a566402f90ae30e97f990db',
      name: 'Faulkner Flores',
      email: 'faulknerflores@renovize.com',
      phone: '+1 (952) 501-2678',
      coins: 0
    },
    {
      _id: '5a5664027bae84ef280ffbdf',
      name: 'Holder Bean',
      email: 'holderbean@renovize.com',
      phone: '+1 (989) 503-2663',
      coins: 0
    },
    {
      _id: '5a566402e3b846c5f6aec652',
      name: 'Rosanne Shelton',
      email: 'rosanneshelton@renovize.com',
      phone: '+1 (968) 454-3851',
      coins: 0
    },
    {
      _id: '5a56640272c7dcdf59c3d411',
      name: 'Pamela Nolan',
      email: 'pamelanolan@renovize.com',
      phone: '+1 (986) 545-2166',
      coins: 0
    },
    {
      _id: '5a5664029a8dd82a6178b15f',
      name: 'Roy Cantu',
      email: 'roycantu@renovize.com',
      phone: '+1 (929) 571-2295',
      coins: 0
    },
    {
      _id: '5a5664028c096d08eeb13a8a',
      name: 'Ollie Christian',
      email: 'olliechristian@renovize.com',
      phone: '+1 (977) 419-3550',
      coins: 0
    },
    {
      _id: '5a5664026c53582bb9ebe9d1',
      name: 'Nguyen Walls',
      email: 'nguyenwalls@renovize.com',
      phone: '+1 (963) 471-3181',
      coins: 0
    },
    {
      _id: '5a56640298ab77236845b82b',
  
      name: 'Glenna Santana',
      email: 'glennasantana@renovize.com',
      phone: '+1 (860) 467-2376',
      coins: 0
    },
    {
      _id: '5a56640208fba3e8ecb97305',
      name: 'Malone Clark',
      email: 'maloneclark@renovize.com',
      phone: '+1 (818) 565-2557',
      coins: 0
    },
    {
      _id: '5a566402abb3146207bc4ec5',
      name: 'Floyd Rutledge',
      email: 'floydrutledge@renovize.com',
      phone: '+1 (807) 597-3629',
      coins: 0
    },
    {
      _id: '5a56640298500fead8cb1ee5',
      name: 'Grace James',
      email: 'gracejames@renovize.com',
      phone: '+1 (959) 525-2529',
      coins: 0
    },
    {
      _id: '5a56640243427b8f8445231e',
      name: 'Tanner Gates',
      email: 'tannergates@renovize.com',
      phone: '+1 (978) 591-2291',
      coins: 0
    },
    {
      _id: '5a5664025c3abdad6f5e098c',
      name: 'Lilly Conner',
      email: 'lillyconner@renovize.com',
      phone: '+1 (842) 587-3812',
      coins: 0
    },
]

var gContacts = _loadContacts()

function query(filterBy) {
    let contactsToReturn = gContacts;
    if (filterBy) {
        var { name } = filterBy
        name = name.toLocaleLowerCase()
        contactsToReturn = contactsToReturn.filter((contact) => {
          return (
            contact.name.toLocaleLowerCase().includes(name)

          )
        })
    }
    return Promise.resolve([...contactsToReturn]);
}
function tryContact(id) {
    const contact = gContacts.find(contact => contact._id === id)
    contact.batteryStatus -= 10
    return Promise.resolve()
}
function getById(id) {
    const contact = gContacts.find(contact => contact._id === id)
    return Promise.resolve({ ...contact })
}

function remove(id) {
    const idx = gContacts.findIndex(contact => contact._id === id)
    gContacts.splice(idx, 1)
    if (!gContacts.length) gContacts = gDefaultContacts.slice()
    storageService.store(STORAGE_KEY, gContacts)
    return Promise.resolve()
}

function save(contactToSave) {
    if (contactToSave._id) {
        const idx = gContacts.findIndex(contact => contact._id === contactToSave._id)
        gContacts.splice(idx, 1, contactToSave)
    } else {
        contactToSave._id = makeId()
        // contactToSave.batteryStatus = 100
        gContacts.unshift(contactToSave)
    }
    storageService.store(STORAGE_KEY, gContacts)
    return Promise.resolve(contactToSave);
}

// function _update(contactToSave) {
//     const idx = gContacts.findIndex(contact => contact._id === contactToSave._id)
//     gContacts.splice(idx, 1, contactToSave)
//     return Promise.resolve(contactToSave)
// }


// function _add(contactToSave) {

// }

function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: '',
        coins: 0
    }
}

function _loadContacts() {
    let contacts = storageService.load(STORAGE_KEY)
    if (!contacts || !contacts.length) contacts = gDefaultContacts
    storageService.store(STORAGE_KEY, contacts)
    return contacts
}

