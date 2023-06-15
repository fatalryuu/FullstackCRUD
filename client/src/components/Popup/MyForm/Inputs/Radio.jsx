import React from 'react';
import PropTypes from "prop-types";

const Radio = ({value, defaultChecked, text, name, register}) => {
    return (
        <>
            <input
                type="radio"
                value={value}
                defaultChecked={defaultChecked}
                {...register(name)}
            />{" "}
            {text}{" "}
        </>
    );
};

Radio.propTypes = {
    value: PropTypes.string,
    defaultChecked: PropTypes.bool,
    text: PropTypes.string,
    name: PropTypes.string,
    register: PropTypes.func,
}

export default Radio;