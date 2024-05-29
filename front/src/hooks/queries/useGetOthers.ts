import { getOtheres } from "@/api";
import { queryKeys } from "@/constants";
import { Others, UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";

function useGetOthers(queryOptions?: UseQueryCustomOptions<Others[]>){
    return useQuery({
        queryFn: getOtheres,
        queryKey: [queryKeys.BUS, queryKeys.GET_BUSES],
        ...queryOptions,
    });
}

export default useGetOthers;