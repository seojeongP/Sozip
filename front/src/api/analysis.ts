import { Analysis } from "@/types";
import axiosInstance from "./axios"

const getAnalysis = async(): Promise<Analysis[]> => {
    const {data} = await axiosInstance.get('/analysis')

    return data;
};

export {getAnalysis};