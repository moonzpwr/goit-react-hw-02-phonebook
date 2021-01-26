
import { Component } from 'react';
import ContactForm from './Components/ContactForm/ContactForm'
import ContactList from './Components/ContactList/ContactList'
import Filter from './Components/Filter/Filter'
import { v4 as uuidv4 } from 'uuid';
import './App.css'


class App extends Component {
state = {
  contacts: [],
    filter: '',
}
  
  componentDidUpdate( prevState) { 
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount() {
    const localStoregeContacts = localStorage.getItem('contacts')
    if (localStoregeContacts) {
      this.setState({contacts: JSON.parse(localStoregeContacts)})
    }
    
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
