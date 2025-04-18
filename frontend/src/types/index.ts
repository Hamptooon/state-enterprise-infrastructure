export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Application {
    id: number;
    caption: string;
}

export interface Interface {
    id: number;
    caption: string;
    status: string;
    statusColor: string;
    statusDescription: string;
}

export interface Metric {
    id: number;
    datetime: string;
    cpuUtilization: number;
    memoryUtilization: number;
    diskUtilization: number;
    nodeId: number;
}

export interface Node {
    id: number;
    caption: string;
    status: number;
    statusColor: string;
    statusDescription: string;
    interface: Interface;
    admin: User;
    applications?: Application[];
    metrics?: Metric[];
}

export interface Group {
    id: number;
    caption: string;
    nodes: Node[];
}
export interface FlatGroup {
    id: number;
    groupName: string;
    nodeId: number;
    nodeName: string;
    nodeStatus: number;
    nodeStatusColor: string;
    nodeStatusDescription: string;
    interfaceName: string;
    interfaceId: number;
    interfaceStatus: string;
    interfaceStatusColor: string;
    interfaceStatusDescription: string;
    applicationId: number;
    applicationName: string;
    adminId: number;
    adminName: string;
    adminEmail: string;
}
export interface RootState {
    infrastructure: InfrastructureState;
}

export interface InfrastructureState {
    groups: Group[];
    metrics: Metric[];
    loading: boolean;
    error: string | null;
    selectedGroup: Group | null;
    selectedNode: Node | null;
}

export interface Status {
    description: string;
    color: string;
}
