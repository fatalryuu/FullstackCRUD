import List from "./components/List/List";
import { useEffect, useState } from "react";
import {getList} from "./api/api";

function App() {
    const [list, setList] = useState([]);
    useEffect(() => {
        const getAsyncList = async () => {
            const response = await getList();
            setList(response);
        }
        getAsyncList();
        console.log(list);
    }, []);

    return (
        <div className="app">
            <List list={list}/>
        </div>
    );
}

export default App;
