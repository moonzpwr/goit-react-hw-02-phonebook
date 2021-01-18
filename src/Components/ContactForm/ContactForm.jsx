import { Component } from 'react'
import s from './ContactForm.module.css'
import propTypes from 'prop-types'

export default class ContactForm extends Component { 

    state = {
        name: '',   
        number: ''
    }

    handleSubmit = e => { 
        e.preventDefault()
        this.props.onAddContact(this.state)
        this.setState({name: '', number: ''})
    }

    handleChange = e => { 
        e.target.type === 'text' ?
        this.setState({
            name: e.target.value       
    }) :  this.setState({
            number: e.target.value       
    })
    }

    render() {
        const { name, number } = this.state;


        return (
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
        )
        }
  
}

ContactForm.propTypes = {
    onAddContact: propTypes.func.isRequired
}