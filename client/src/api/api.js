import axios from "axios";

export const getList = async () => {
    try {
        const response = await axios.get("http://localhost:5000/");
        return response.data;
    } catch (e) {
        return e;
    }
};

export const addToList = async data => {
    try {
        const response = await axios.post("http://localhost:5000/", data);
        return response.data;
    } catch (e) {
        return e;
    }
};

export const updateList = async (data) => {
    try {
        await axios.put("http://localhost:5000/", data);
    } catch (e) {
        return e;
    }
};