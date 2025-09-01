import { useInfiniteQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../constants/query-keys.constant"
import { GIPHY_LIMIT } from "../constants/gif-limit.constant"
import { gifService } from "../../service/gif.service"
import type { GiphySearchResponse } from "../../types/giphy.types"

export const useGifSearchPaginated = (search: string) => {
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage,isLoading,status,} = useInfiniteQuery({
        queryKey: [QUERY_KEYS.GIPHY_SEARCH, search],
        getNextPageParam: (lastPage: GiphySearchResponse,) => lastPage.pagination.offset + lastPage.pagination.count,
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => gifService.searchGifs(search, pageParam, GIPHY_LIMIT),
        enabled: !!search.trim(),
    })

    return {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, status}
}