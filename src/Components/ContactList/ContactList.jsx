import {TransitionGroup, CSSTransition} from 'react-transition-group'
import propTypes from 'prop-types'
import ContactItem from './ContactItem/ContactItem'
import s from "./ContactList.module.css";



export default function ContactList({ contacts, onRemoveContact }) { 
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