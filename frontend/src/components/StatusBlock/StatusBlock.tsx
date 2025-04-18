import React from "react";
import { useSelector } from "react-redux";
import { selectWorstStatus } from "../../store/selectors";
import * as styles from "./StatusBlock.module.scss";
const StatusBlock: React.FC = () => {
    const worstStatus = useSelector(selectWorstStatus);

    if (!worstStatus) {
        return (
            <div className={styles.statusBlock}>
                <h2>Статус</h2>
                <p>Нет данных о статусе</p>
            </div>
        );
    }

    return (
        <div className={styles.statusBlock}>
            <h2>Статус</h2>
            <div className={styles.status}>
                <div
                    className={styles.statusIndicator}
                    style={{ backgroundColor: worstStatus.color }}
                />
                <span style={{ color: worstStatus.color }}>
                    {worstStatus.description}
                </span>
            </div>
        </div>
    );
};

export default StatusBlock;
