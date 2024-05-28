import { getBuses } from "@/api";
import { queryKeys } from "@/constants";
import { Bus, UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";

function useGetBuses(queryOptions?: UseQueryCustomOptions<Bus[]>){
    return useQuery({
        queryFn: getBuses,
        queryKey: [queryKeys.BUS, queryKeys.GET_BUSES],
        ...queryOptions,
    });
}

export default useGetBuses;