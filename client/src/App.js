import List from "./components/List/List";
import { useEffect, useState, createContext } from "react";
import { getList } from "./api/api";

export const ListContext = createContext();

function App() {
    const [list, setList] = useState([]);
    useEffect(() => {
        const getAsyncList = async () => {
            const response = await getList();
            setList(response);
        };
        getAsyncList();
    }, []);

    return (
        <div className="app">
            <ListContext.Provider value={{ list, setList }}>
                <List />
            </ListContext.Provider>
        </div>
    );
}

export default App;
