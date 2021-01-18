
import { Component } from 'react';
import ContactForm from './Components/ContactForm/ContactForm'
import ContactList from './Components/ContactList/ContactList'
import Filter from './Components/Filter/Filter'
import { v4 as uuidv4 } from 'uuid';
import './App.css'


class App extends Component {
state = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
  ],
    filter: '',
}
  
  addContact = ({name, number}) => { 
    const contact = {
      name: name,
      number: number,
      id: uuidv4()
    }

    this.setState(prevStage => { 
      return prevStage.contacts.filter(el => el.name.includes(contact.name)).length > 0 ?
        alert(`${contact.name} is already in contacts.`) :
        { contacts: [...prevStage.contacts, contact] };    
    })
  }

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(el => el.id !== contactId)
      }
    })
  }

  cahngeFilter = filter => { 
    this.setState({filter: filter.target.value})
  }

  filtredContacts = () => {
    const {contacts, filter} = this.state
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  render() {
    const visibleContacts = this.filtredContacts();
    const { filter, contacts } = this.state;

 return (
   <div className="main-container">
  <h1>Phonebook</h1>
     <ContactForm onAddContact={this.addContact}/>

     <h2>Contacts</h2>
     {contacts.length > 1 &&
     <Filter value={filter} oncahngeFilter={this.cahngeFilter }/>}
     <ContactList contacts={visibleContacts} onRemoveContact={this.removeContact}/>
</div>
  );
  }
 
}

export default App;
