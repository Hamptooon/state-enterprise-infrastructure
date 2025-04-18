import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNode } from "../../../store/slice";
import { Node } from "../../../types";
import { getMetricColorClass } from "../../../utils/helpers";
import { selectMetrics, selectSelectedNode } from "../../../store/selectors";
import * as styles from "./NodeBlock.module.scss";

interface NodeBlockProps {
    node: Node;
}

const NodeBlock: React.FC<NodeBlockProps> = ({ node }) => {
    const dispatch = useDispatch();
    const allMetrics = useSelector(selectMetrics);
    const selectedNode = useSelector(selectSelectedNode);

    const isSelected = selectedNode?.id === node.id;

    const latestMetric = [...allMetrics]
        .filter((m) => m.nodeId === node.id)
        .sort((a, b) => {
            return (
                new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
            );
        })[0];
    console.log("allMetrics", allMetrics);
    const handleNodeClick = () => {
        dispatch(selectNode(isSelected ? null : node));
    };

    return (
        <div
            className={`${styles.nodeBlock} ${
                isSelected ? styles.selected : ""
            }`}
            onClick={handleNodeClick}
        >
            <div className={styles.header}>
                <span>{node.caption}</span>
                <div
                    className={styles.statusIndicator}
                    style={{ backgroundColor: node.statusColor || "#ddd" }}
                />
            </div>

            {latestMetric && (
                <div className={styles.metrics}>
                    <div className={styles.metric}>
                        <div className={styles.name}>CPU</div>
                        <div
                            className={` ${styles.value}
    ${styles[getMetricColorClass(latestMetric.cpuUtilization)]}`}
                        >
                            {latestMetric.cpuUtilization}%
                        </div>
                    </div>
                    <div className={styles.metric}>
                        <div className={styles.name}>Memory</div>
                        <div
                            className={`${styles.value}
    ${styles[getMetricColorClass(latestMetric.memoryUtilization)]}`}
                        >
                            {latestMetric.memoryUtilization}%
                        </div>
                    </div>
                    <div className={styles.metric}>
                        <div className={styles.name}>Disk</div>
                        <div
                            className={`${styles.value}
    ${styles[getMetricColorClass(latestMetric.diskUtilization)]}`}
                        >
                            {latestMetric.diskUtilization}%
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NodeBlock;
