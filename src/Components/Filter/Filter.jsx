import s from "./Filter.module.css";
import propTypes from 'prop-types'
import { connect } from "react-redux";
import phonebookActions from '../../redux/phonebook/phonebook-actions';

function Filter({ value='', oncahngeFilter }) {
    return (
        <div>
            <label className={s.filterLabel}>Find contacts by name
                <input type="text" value={value } onChange={ oncahngeFilter}/>
            </label>
        </div>
    )
}

Filter.propTypes = {
    value: propTypes.string,
    oncahngeFilter: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    value: state.contacts.filter
})

const mapDispatchToProps = dispatch => ({
    oncahngeFilter: (event) => dispatch(phonebookActions.cahngeFilter(event.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)