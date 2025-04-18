import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group, InfrastructureState, Metric, Node } from "../types";

const initialState: InfrastructureState = {
    groups: [],
    metrics: [],
    loading: false,
    error: null,
    selectedGroup: null,
    selectedNode: null,
};

const infrastructureSlice = createSlice({
    name: "infrastructure",
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchGroupsSuccess(state, action: PayloadAction<Group[]>) {
            state.groups = action.payload;
            state.loading = false;
        },
        fetchMetricsSuccess(state, action: PayloadAction<Metric[]>) {
            state.metrics = action.payload;
            state.loading = false;
        },
        fetchDataFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        selectGroup(state, action: PayloadAction<Group | null>) {
            state.selectedGroup = action.payload;
            state.selectedNode = null;
        },
        selectNode(state, action: PayloadAction<Node | null>) {
            state.selectedNode = action.payload;
        },
    },
});

export const {
    fetchDataStart,
    fetchGroupsSuccess,
    fetchMetricsSuccess,
    fetchDataFailure,
    selectGroup,
    selectNode,
} = infrastructureSlice.actions;

export default infrastructureSlice.reducer;
