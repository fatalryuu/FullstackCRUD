import React from 'react';
import PropTypes from "prop-types";

const Select = ({label, options, name, register}) => {
    const optionsUI = options.map(o => <option value={o} key={o}>{o}</option>)
    return (
        <>
            <label>{label}</label>
            <select {...register(name)}>
                {optionsUI}
            </select>
            <br />
        </>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    name: PropTypes.string,
    register: PropTypes.func,
}

export default Select;