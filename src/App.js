import {CSSTransition} from 'react-transition-group'
import ContactForm from './Components/ContactForm/ContactForm'
import ContactList from './Components/ContactList/ContactList'
import Filter from './Components/Filter/Filter'
import { connect } from 'react-redux';
import './App.css'


function App(props) {
  return (
   <div className="main-container">
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames='title'>
        <h1>Phonebook</h1>
      </CSSTransition>
      
      <ContactForm />

      <h2>Contacts</h2>
      <CSSTransition
        in={props.contacts.length > 1}
        unmountOnExit
        timeout={250}
        classNames='filter'
        >
        <Filter/>
      </CSSTransition>

      <ContactList/>
    </div>
  );
  }

const mapStateToProps = (state) => ({
    contacts: state.contacts.items
})

export default connect(mapStateToProps)(App);
