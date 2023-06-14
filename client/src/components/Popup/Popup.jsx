import React from "react";
import s from "./Popup.module.css";
import PropTypes from "prop-types";
import MyForm from "./MyForm/MyForm";

const Popup = ({ isVisible, setIsVisible }) => {
    return (
        <div className={isVisible ? s.visible : s.hidden}>
            <div className={s.wrapper}>
                <button
                    onClick={() => setIsVisible(false)}
                    className={s.button}
                >
                    X
                </button>
                <MyForm initValues={null} setIsVisible={setIsVisible}/>
            </div>
        </div>
    );
};

Popup.propTypes = {
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func,
};

export default Popup;
