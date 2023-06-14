import React from "react";
import s from "./List.module.css";
import PropTypes from "prop-types";
import ListElement from "./ListElement/ListElement";

const List = ({ list }) => {
    const elements = list.map(el => <ListElement info={el} key={el.id}/>);
    return <div className={s.wrapper}>{elements}</div>;
};

List.propTypes = {
    list: PropTypes.array,
};

export default List;
