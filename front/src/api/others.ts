import { Bus } from "@/types";
import axiosInstance from "./axios"

const getBuses = async(): Promise<Bus[]> => {
    const {data} = await axiosInstance.get('/others/bus')

    return data;
};

export {getBuses};