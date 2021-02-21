// import types from './phonebook-types';
import { v4 as uuidv4 } from 'uuid';
import { createAction } from "@reduxjs/toolkit";

const addContact = createAction('phonebook/add', ({ name, number }) => {
    return {
        payload: {
      name: name,
      number: number,
      id: uuidv4()
    }
    }
})

// const addContact = ({ name, number }) => ({
//     type: types.ADD,
//     payload: {
//       name: name,
//       number: number,
//       id: uuidv4()
//     }
// })


const removeContact =createAction('phonebook/remove')

// const removeContact = contactId => ({
//     type: types.REMOVE,
//     payload: contactId
// })


const cahngeFilter = createAction('phonebook/changeFilter')

// const cahngeFilter = (value) => ({
//     type: types.CHANGE_FILTER,
//     payload: value
// })

const phonebookActions = {addContact, removeContact, cahngeFilter}

export default phonebookActions