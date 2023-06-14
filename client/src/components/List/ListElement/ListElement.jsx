import React from "react";
import PropTypes from "prop-types";
import s from "./ListElement.module.css";
import SocialElement from "./SocialElement/SocialElement";

const ListElement = ({info}) => {
    const socials = info.social.map(el => <SocialElement info={el} key={el.id}/>)
    return (
        <div className={s.wrapper}>
            <div>{info.name}</div>
            <div>{info.username}</div>
            <div>{info.country}</div>
            <div>{info.age}</div>
            <div>{info.game}</div>
            <div>{info.level}</div>
            {info.isProfessional && <div>
                <div>{info.professional.team}</div>
                <div>{info.professional.earnings}$</div>
            </div>}
            <div>{socials}</div>
        </div>
    );
};

ListElement.propTypes = {
    info: PropTypes.object
}

export default ListElement;