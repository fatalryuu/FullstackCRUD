import axios from "axios";

export const getList = async () => {
    try {
        const response = await axios.get("http://localhost:5000/");
        return response.data;
    } catch (e) {
        return e;
    }
}