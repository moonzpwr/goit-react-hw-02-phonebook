import s from "./Filter.module.css";
import propTypes from 'prop-types'

export default function Filter({ value='', oncahngeFilter }) {
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