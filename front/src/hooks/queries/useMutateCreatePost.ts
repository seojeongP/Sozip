import { createPost } from "@/api";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Marker } from "@/types";
import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: createPost,
        onSuccess:  newPost =>{
            // queryClient.invalidateQueries({
            //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
            // });
      
            queryClient.setQueryData<Marker[]>(
              [queryKeys.MARKER, queryKeys.GET_MARKERS],
              existingMarkers => {
                const newMarker = {
                  id: newPost.id,
                  latitude: newPost.latitude,
                  longitude: newPost.longitude,
                  color: newPost.color,
                  score: newPost.score,
                  symbol: newPost.symbol,
                };
      
                return existingMarkers
                  ? [...existingMarkers, newMarker]
                  : [newMarker];
              },
            );
          },
        ...mutationOptions,
    });
}

export default useMutateCreatePost;