import { FlatGroup, Group } from "../types/index";
export const getMetricColorClass = (value: number): string => {
    if (value > 95) return "danger";
    if (value > 85) return "warning";
    return "normal";
};

export const formatDateTime = (dateTimeStr: string): string => {
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date);
};
export function transformFlatGroups(flatGroups: FlatGroup[]): Group[] {
    const groupMap = new Map<number, Group>();

    for (const item of flatGroups) {
        if (!groupMap.has(item.id)) {
            groupMap.set(item.id, {
                id: item.id,
                caption: item.groupName,
                nodes: [],
            });
        }

        const group = groupMap.get(item.id)!;

        let node = group.nodes.find((n) => n.id === item.nodeId);

        if (!node) {
            node = {
                id: item.nodeId,
                caption: item.nodeName,
                status: item.nodeStatus,
                statusColor: item.nodeStatusColor,
                statusDescription: item.nodeStatusDescription,
                interface: {
                    id: item.interfaceId,
                    caption: item.interfaceName,
                    status: item.interfaceStatus,
                    statusColor: item.interfaceStatusColor,
                    statusDescription: item.interfaceStatusDescription,
                },
                admin: {
                    id: item.adminId,
                    name: item.adminName,
                    email: item.adminEmail,
                },
                applications: [],
            };

            group.nodes.push(node);
        }

        if (
            item.applicationId &&
            item.applicationName &&
            !node.applications?.some((app) => app.id === item.applicationId)
        ) {
            node.applications?.push({
                id: item.applicationId,
                caption: item.applicationName,
            });
        }
    }

    return Array.from(groupMap.values());
}
