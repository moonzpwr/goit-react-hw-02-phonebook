import ContactItem from './ContactItem/ContactItem'
import propTypes from 'prop-types'

export default function ContactList({ contacts, onRemoveContact }) { 
    return (
        <ul>
            {contacts.map(el => {
                return (
                    <ContactItem
                        id={el.id}
                        key={el.id}
                        name={el.name}
                        number={el.number}
                        onClickRemove={onRemoveContact}/>
                )
            })}
        </ul>
    )
}

ContactList.propTypes = {
    onRemoveContact: propTypes.func.isRequired,
    contacts: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired
}