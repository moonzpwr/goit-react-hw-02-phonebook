import { Component } from 'react'
import {CSSTransition} from 'react-transition-group'
import s from './ContactForm.module.css'
import propTypes from 'prop-types'
import { connect } from 'react-redux';
import phonebookActions from "../../redux/phonebook/phonebook-actions";
import Alert from '../Alert/Alert'


class ContactForm extends Component { 

    state = {
        name: '',   
        number: '',
        isExist: false
    }

    handleSubmit = e => { 
        if (this.props.contacts.filter(el => el.name === this.state.name).length === 0) {
            e.preventDefault()
            this.props.onAddContact(this.state)
            this.setState({ name: '', number: '' })
            return
        } 
        e.preventDefault()
        this.setState({ isExist: true })
        setTimeout(() => {
            this.setState({isExist: false})
        }, 4000)
    }

    handleChange = e => { 
        e.target.type === 'text' ?
        this.setState({
            name: e.target.value       
    }) :  this.setState({
            number: e.target.value       
    })
    }

    closeNotification = () => {
    this.setState({isExist: false})
  }

    render() {
        const { name, number } = this.state;


        return (
            <>
            <form className={s.container} onSubmit={this.handleSubmit}>
                <label className={s.contactName}>Name
                    <input type="text"
                    value={name}
                    onChange={this.handleChange} />
                </label>
                <label className={s.contactName}>Number
                    <input type="tel"
                    value={number}
                    onChange={this.handleChange}/>
                </label>
                <button
                    type='submit'
                    className={s.submitBtn}
                >Add contact</button>
            </form>
            <CSSTransition
            in={this.state.isExist}
            unmountOnExit
            timeout={250}
            classNames='notification'>
                <Alert onClickClose={this.closeNotification} />
            </CSSTransition>
            </>
        )
        }
  
}

ContactForm.propTypes = {
    onAddContact: propTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    contacts: state.contacts.items
})


const mapDispatchToProps = dispatch => ({
    onAddContact: (contact) => dispatch(phonebookActions.addContact(contact))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)