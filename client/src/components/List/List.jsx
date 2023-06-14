import React, { useContext, useState } from "react";
import s from "./List.module.css";
import ListElement from "./ListElement/ListElement";
import Popup from "../Popup/Popup";
import { ListContext } from "../../App";

const List = () => {
    const { list } = useContext(ListContext);
    const [isVisible, setIsVisible] = useState(false);
    const [values, setValues] = useState(null);
    const elements = list.map(el => <ListElement info={el} setIsVisible={setIsVisible} setValues={setValues} key={el.id}/>);

    const handleClick = () => {
        setValues(null);
        setIsVisible(true);
    }

    return (
        <>
            <Popup initValues={values} isVisible={isVisible} setIsVisible={setIsVisible}/>
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
                    <tbody>{elements}</tbody>
                </table>
                <button className={s.button} onClick={handleClick}>
                    Create
                </button>
            </div>
        </>
    );
};

export default List;
