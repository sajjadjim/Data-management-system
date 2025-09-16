import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`
})

const useAxiosInstance = () => {
    return axiosInstance;
};

export default useAxiosInstance;