import { Others } from "@/types";
import axiosInstance from "./axios"

const getOtheres = async(): Promise<Others[]> => {
    const {data} = await axiosInstance.get('/others')

    return data;
};

export {getOtheres};