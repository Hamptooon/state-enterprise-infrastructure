import { Group, Metric } from "../types";
import { transformFlatGroups } from "../utils/helpers";

const API_URL = "http://127.0.0.1:23456/api";

export const fetchGroups = async (): Promise<Group[]> => {
    try {
        const response = await fetch(`${API_URL}/groups`);
        if (!response.ok) {
            throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        return transformFlatGroups(data);
    } catch (error) {
        console.error("Error fetching groups:", error);
        throw error;
    }
};

export const fetchMetrics = async (): Promise<Metric[]> => {
    try {
        const response = await fetch(`${API_URL}/metrics`);
        if (!response.ok) {
            throw new Error("Failed to fetch metrics");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching metrics:", error);
        throw error;
    }
};
