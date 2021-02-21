import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// import types from "./phonebook-types";
import actions from './phonebook-actions';

const items = createReducer([], {
    [actions.addContact]: (state, {payload}) => [...state, payload],
    [actions.removeContact]: (state, {payload}) => state.filter(el => el.id !== payload)
})

// const items = (state = [], { type, payload }) => {
//     switch (type) {
//         case types.ADD:
//             return [...state, payload];
        
//         case types.REMOVE:
//             return state.filter(el => el.id !== payload)
    
//         default:
//             return state;
//     }
// };

const filter = createReducer('', {
    [actions.cahngeFilter]: (state, {payload}) => payload
})

// const filter = (state = '', { type, payload }) => {
//     switch (type) {
//         case 'phonebook/changeFilter':
//             return payload;
            
//         default:
//             return state;
//     }
// };


export default combineReducers({
    items,
    filter
})