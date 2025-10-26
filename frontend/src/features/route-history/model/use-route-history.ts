import useRouteHistory from "@/entities/route/model/use-route-history";

const useFetchRouteHistory = () => {
    const {data: routeHistory} = useRouteHistory();

    return {
        routeHistory,
    }
}

export default useFetchRouteHistory;