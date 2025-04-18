import { AppThunk } from "./store";
import { fetchGroups, fetchMetrics } from "./api";
import {
    fetchDataStart,
    fetchGroupsSuccess,
    fetchMetricsSuccess,
    fetchDataFailure,
} from "./slice";

export const loadInfrastructureData = (): AppThunk => async (dispatch) => {
    dispatch(fetchDataStart());
    try {
        const [groupsData, metricsData] = await Promise.all([
            fetchGroups(),
            fetchMetrics(),
        ]);
        dispatch(fetchGroupsSuccess(groupsData));
        dispatch(fetchMetricsSuccess(metricsData));
    } catch (error) {
        dispatch(
            fetchDataFailure(
                error instanceof Error ? error.message : "Unknown error"
            )
        );
    }
};
