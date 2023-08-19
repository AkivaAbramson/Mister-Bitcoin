import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function ContactFilter(props) {
    const [filterBy, setFilterBy] = useState(props.filterBy)

    useEffect(()=>{
        if (!filterBy) return
        props.onChangeFilter(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value 
        console.log(field,value)

        setFilterBy(prevFilterBy => ({
            ...prevFilterBy,
            [field]: value
        }))
    }

    if (!filterBy) return <div>Loading...</div>
    const { name } = filterBy
    return (
        <section className='contact-filter'>
          <label htmlFor="name" className="form-label">
            Search Contact
          </label>
          <input
            onChange={handleChange}
            id="name"
            type="text"
            name="name"
            className="form-input"
            value={name}
            autoComplete="off"
          />
          <Link  className='clean btn-edit' to={`/contact/edit`} >+ Add Contact</Link>
      </section>
    )
}
