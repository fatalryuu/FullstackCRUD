import React from "react";
import s from "./Popup.module.css";
import PropTypes from "prop-types";
import MyForm from "./MyForm/MyForm";

const Popup = ({ initValues, isVisible, setIsVisible }) => {
    return (
        <div className={isVisible ? s.visible : s.hidden}>
            <div className={s.wrapper}>
                <MyForm initValues={initValues} setIsVisible={setIsVisible}/>
            </div>
        </div>
    );
};

Popup.propTypes = {
    initValues: PropTypes.object,
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func,
};

export default Popup;
