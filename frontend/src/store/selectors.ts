import { createSelector } from "@reduxjs/toolkit";
import { RootState, Group, Node, Status } from "../types";

export const selectGroups = (state: RootState) => state.infrastructure.groups;
export const selectMetrics = (state: RootState) => state.infrastructure.metrics;
export const selectLoading = (state: RootState) => state.infrastructure.loading;
export const selectError = (state: RootState) => state.infrastructure.error;
export const selectSelectedGroup = (state: RootState) =>
    state.infrastructure.selectedGroup;
export const selectSelectedNode = (state: RootState) =>
    state.infrastructure.selectedNode;

export const selectFilteredNodes = createSelector(
    [selectGroups, selectSelectedGroup],
    (groups, selectedGroup): Node[] => {
        if (selectedGroup) {
            return selectedGroup.nodes || [];
        }
        return groups.flatMap((group) => group.nodes || []);
    }
);

export const selectFilteredGroups = createSelector(
    [selectGroups, selectSelectedNode],
    (groups, selectedNode): Group[] => {
        if (selectedNode) {
            return groups.filter((group) =>
                group.nodes.some((node) => node.id === selectedNode.id)
            );
        }
        return groups;
    }
);

export const selectNodeMetrics = createSelector(
    [selectMetrics, selectSelectedNode],
    (metrics, selectedNode) => {
        if (!selectedNode) {
            return [];
        }
        return metrics.filter((metric) => metric.nodeId === selectedNode.id);
    }
);

export const selectWorstStatus = createSelector(
    [selectFilteredNodes],
    (nodes): Status | null => {
        const statusPriorityMap: Record<number, number> = {
            1: 6, // UNREACHABLE
            2: 5, // SHUTDOWN
            6: 4, // DOWN
            5: 3, // CRITICAL
            4: 2, // WARNING
            3: 1, // UP
        };
        let worstNode: Node = null;
        let worstPriority = -1;

        nodes.forEach((node) => {
            const priority = statusPriorityMap[node.status] || 0;
            if (priority > worstPriority) {
                worstPriority = priority;
                worstNode = node;
            }
        });

        return {
            description: worstNode?.statusDescription || "None",
            color: worstNode?.statusColor || "None",
        };
    }
);
