import React from "react";
import PropTypes from "prop-types";
import s from "./ListElement.module.css";
import SocialElement from "./SocialElement/SocialElement";

const ListElement = ({ info, setIsVisible, setValues }) => {
    const socials = info.social?.map(el => (
        <SocialElement info={el} key={el.id} />
    ));

    const handleClick = () => {
        setValues(info);
        setIsVisible(true);
    }

    return (
        <tr>
            <td>{info.name}</td>
            <td>{info.username}</td>
            <td>{info.country}</td>
            <td>{info.age}</td>
            <td>{info.game}</td>
            <td>{info.level}</td>
            <td>{info.isProfessional ? info.professional.team : "No"}</td>
            <td>{info.isProfessional ? info.professional.earnings : 0}$</td>
            <td>{socials}</td>
            <td>
                <button className={s.button} onClick={handleClick}>
                    Edit
                </button>
            </td>
        </tr>
    );
};

ListElement.propTypes = {
    info: PropTypes.object,
    setIsVisible: PropTypes.func,
    setValues: PropTypes.func,
};

export default ListElement;