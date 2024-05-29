import { getAnalysis } from "@/api/analysis";
import { queryKeys } from "@/constants";
import { Analysis, UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";

function useGetAnalysis(queryOptions?: UseQueryCustomOptions<Analysis[]>){
    return useQuery({
        queryFn: getAnalysis,
        queryKey: [queryKeys.ANALYSIS, queryKeys.GET_ANALYSIS],
        ...queryOptions,
    });
}

export default useGetAnalysis;