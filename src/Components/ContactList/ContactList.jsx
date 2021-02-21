import {TransitionGroup, CSSTransition} from 'react-transition-group'
import propTypes from 'prop-types'
import ContactItem from './ContactItem/ContactItem'
import s from "./ContactList.module.css";
import { connect } from 'react-redux';
import phonebookActions from "../../redux/phonebook/phonebook-actions";



function ContactList({ contacts, onRemoveContact }) { 
    return (
        <TransitionGroup component='ul' >
            {contacts.map(el => {
                return (
                    <CSSTransition key={el.id} timeout={250} classNames={s}>
                        <ContactItem
                            id={el.id}
                            name={el.name}
                            number={el.number}
                            onClickRemove={onRemoveContact} />
                    </CSSTransition>
                )
            })}
        </TransitionGroup>
    )
}

ContactList.propTypes = {
    onRemoveContact: propTypes.func.isRequired,
    contacts: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired
}

 const filtredContacts = (allContacts, filter) => {
    // const {contacts, filter} = this.state
    return allContacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }


const mapStateProps = state => {
    const { items, filter } = state.contacts
    const visibleContacts = filtredContacts(items, filter)
    return {
contacts: visibleContacts
}
}

const mapDispatchprops = dispatch => ({
onRemoveContact: (id) => dispatch(phonebookActions.removeContact(id))
})

export default connect(mapStateProps, mapDispatchprops)(ContactList)