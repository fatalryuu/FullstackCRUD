import React from 'react';
import PropTypes from "prop-types";

const Input = ({label, type, placeholder, errors, name, register}) => {
    return (
        <>
            {errors[name] && <p style={{color: "red"}}>{errors[name].message}</p>}
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                {...register(name)}
            />
            <br/>
        </>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    errors: PropTypes.object,
    name: PropTypes.string,
    register: PropTypes.func,
}

export default Input;