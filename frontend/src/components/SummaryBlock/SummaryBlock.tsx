import React from "react";
import { useSelector } from "react-redux";
import {
    selectGroups,
    selectFilteredNodes,
    selectSelectedGroup,
} from "../../store/selectors";
import * as styles from "./SummaryBlock.module.scss";

const SummaryBlock: React.FC = () => {
    const groups = useSelector(selectGroups);
    const nodes = useSelector(selectFilteredNodes);
    const currentGroup = useSelector(selectSelectedGroup);

    const totalGroups = groups.length;
    const totalNodes = nodes.length;

    const statusCounts = {
        UP: nodes.filter((node) => node.status === 3).length,
        WARNING: nodes.filter((node) => node.status === 4).length,
        SHUTDOWN: nodes.filter((node) => node.status === 2).length,
        DOWN: nodes.filter((node) => node.status === 6).length,
        CRITICAL: nodes.filter((node) => node.status === 5).length,
        UNREACHABLE: nodes.filter((node) => node.status === 1).length,
    };

    return (
        <div className={styles.summaryBlock}>
            <h2>Общая информация</h2>

            <div className={styles.statsRow}>
                <div className={styles.statGroup}>
                    <span>Всего групп:</span>
                    <strong>{totalGroups}</strong>
                </div>

                <div className={styles.statGroup}>
                    <span>Текущая группа:</span>
                    <strong>{currentGroup?.caption || "(Не выбрана)"}</strong>
                </div>

                <div className={styles.statGroup}>
                    <span>Всего нод:</span>
                    <strong>{totalNodes}</strong>
                </div>
            </div>

            <div className={styles.statusTables}>
                <div className={styles.statusTable}>
                    <div className={styles.statusRow}>
                        <span className={styles.statusLabel}>UP</span>
                        <span
                            className={`${styles.statusValue} ${styles.normal}`}
                        >
                            {statusCounts.UP}
                        </span>
                    </div>
                    <div className={styles.statusRow}>
                        <span className={styles.statusLabel}>WARNING</span>
                        <span
                            className={`${styles.statusValue} ${styles.warning}`}
                        >
                            {statusCounts.WARNING}
                        </span>
                    </div>
                    <div className={styles.statusRow}>
                        <span className={styles.statusLabel}>SHUTDOWN</span>
                        <span className={`${styles.statusValue}`}>
                            {statusCounts.SHUTDOWN}
                        </span>
                    </div>
                </div>

                <div className={styles.statusTable}>
                    <div className={styles.statusRow}>
                        <span className={styles.statusLabel}>DOWN</span>
                        <span
                            className={`${styles.statusValue} ${styles.warningDanger}`}
                        >
                            {statusCounts.DOWN}
                        </span>
                    </div>
                    <div className={styles.statusRow}>
                        <span className={styles.statusLabel}>CRITICAL</span>
                        <span
                            className={`${styles.statusValue} ${styles.danger}`}
                        >
                            {statusCounts.CRITICAL}
                        </span>
                    </div>
                    <div className={styles.statusRow}>
                        <span className={styles.statusLabel}>UNREACHABLE</span>
                        <span
                            className={`${styles.statusValue} ${styles.none}`}
                        >
                            {statusCounts.UNREACHABLE}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryBlock;
