import React from "react";
import s from './SocialElement.module.css';
import PropTypes from "prop-types";

const SocialElement = ({info}) => {
    return (
        <div className={s.element}>
            <a href={info.url}><b>{info.platform}</b></a>
        </div>
    );
};

SocialElement.propTypes = {
    info: PropTypes.object
}

export default SocialElement;