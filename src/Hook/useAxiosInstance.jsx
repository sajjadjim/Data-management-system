import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://electronics-database-three.vercel.app`
})

const useAxiosInstance = () => {
    return axiosInstance;
};

export default useAxiosInstance;

// https://electronics-database-three.vercel.app
// https://electronics-database-three.vercel.app