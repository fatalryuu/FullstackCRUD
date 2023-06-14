import React from "react";
import s from "./List.module.css";
import PropTypes from "prop-types";
import ListElement from "./ListElement/ListElement";

const List = ({ list }) => {
    const elements = list.map(el => <ListElement info={el} key={el.id}/>);
    return (
        <div className={s.wrapper}>
            <h1>list of players</h1>
            <table className={s.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Country</th>
                    <th>Age</th>
                    <th>Game</th>
                    <th>Level</th>
                    <th>Team</th>
                    <th>Earnings</th>
                    <th>Socials</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>
            </table>
            <button className={s.button}>Create</button>
        </div>
    );
};

List.propTypes = {
    list: PropTypes.array,
};

export default List;
