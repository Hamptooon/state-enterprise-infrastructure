import React from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { selectNodeMetrics, selectSelectedNode } from "../../store/selectors";
import { formatDateTime } from "../../utils/helpers";
import * as styles from "./MetricsBlock.module.scss";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MetricsBlock: React.FC = () => {
    const selectedNode = useSelector(selectSelectedNode);
    const nodeMetrics = useSelector(selectNodeMetrics);

    if (!selectedNode) {
        return (
            <div className={styles.metricsBlock}>
                <h2>Метрики</h2>
                <p className={styles.noNode}>
                    Выберите ноду для просмотра метрик
                </p>
            </div>
        );
    }

    if (nodeMetrics.length === 0) {
        return (
            <div className={styles.metricsBlock}>
                <h2>Метрики: {selectedNode.caption}</h2>
                <p className={styles.noNode}>
                    Нет доступных метрик для этой ноды
                </p>
            </div>
        );
    }

    const sortedMetrics = [...nodeMetrics].sort(
        (a, b) =>
            new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );

    const labels = sortedMetrics.map((metric) =>
        formatDateTime(metric.datetime)
    );
    const cpuData = sortedMetrics.map((metric) => metric.cpuUtilization);
    const memoryData = sortedMetrics.map((metric) => metric.memoryUtilization);
    const diskData = sortedMetrics.map((metric) => metric.diskUtilization);

    const data = {
        labels,
        datasets: [
            {
                label: "Загрузка CPU (%)",
                data: cpuData,
                borderColor: "#00b8f0",
                backgroundColor: "rgba(60, 163, 231, 0.2)",
                tension: 0.4,
            },
            {
                label: "Использование памяти (%)",
                data: memoryData,
                borderColor: "#f1c40f",
                backgroundColor: "rgba(241, 196, 15, 0.2)",
                tension: 0.4,
            },
            {
                label: "Использование диска (%)",
                data: diskData,
                borderColor: "#2ecc71",
                backgroundColor: "rgba(46, 204, 113, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: `Метрики ноды ${selectedNode.caption}`,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 20,
                },
            },
        },
    };

    return (
        <div className={styles.metricsBlock}>
            <h2>Метрики</h2>
            <div className={styles.chartContainer}>
                <Line options={options} data={data} />
            </div>
        </div>
    );
};
export default MetricsBlock;
