
import { Component } from 'react';
import {CSSTransition} from 'react-transition-group'
import ContactForm from './Components/ContactForm/ContactForm'
import ContactList from './Components/ContactList/ContactList'
import Filter from './Components/Filter/Filter'
import Alert from './Components/Alert/Alert'
import { v4 as uuidv4 } from 'uuid';
import './App.css'


class App extends Component {
state = {
  contacts: [],
  filter: '',
  isExist: false
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
        // alert(`${contact.name} is already in contacts.`):
       {isExist: true} :
        { contacts: [...prevStage.contacts, contact], isExist: false };    
    })

    setTimeout(() => {
      this.setState({isExist: false})
    }, 4000)
  }

  closeNotification = () => {
    this.setState({isExist: false})
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

      <CSSTransition
      in={this.state.isExist}
      unmountOnExit
      timeout={250}
      classNames='notification'>
       <Alert onClickClose={this.closeNotification} />
      </CSSTransition>


     <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames='title'>
       <h1>Phonebook</h1>
     </CSSTransition>
    
    <ContactForm onAddContact={this.addContact}/>

     <h2>Contacts</h2>
     <CSSTransition
       in={contacts.length > 1}
       unmountOnExit
       timeout={250}
       classNames='filter'
       >
      <Filter value={filter} oncahngeFilter={this.cahngeFilter }/>
     </CSSTransition>
    {/* {contacts.length > 1 &&} */}
    <ContactList contacts={visibleContacts} onRemoveContact={this.removeContact}/>
</div>
  );
  }
 
}

export default App;
