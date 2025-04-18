import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedNode } from "../../store/selectors";
import * as styles from "./ApplicationsBlock.module.scss";

const ApplicationsBlock: React.FC = () => {
    const selectedNode = useSelector(selectSelectedNode);
    const applications = selectedNode?.applications || [];
    if (!selectedNode) {
        return (
            <div className={styles.applicationsBlock}>
                <h2>Приложения</h2>
                <p className={styles.noNode}>
                    Выберите ноду для просмотра информации об администраторе
                </p>
            </div>
        );
    }
    return (
        <div className={styles.applicationsBlock}>
            <h2>Приложения</h2>
            {applications.length > 0 ? (
                <ul className={styles.applicationsList}>
                    {applications.map((app) => (
                        <li key={app.id} className={styles.applicationItem}>
                            {app.caption}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет установленных приложений</p>
            )}
        </div>
    );
};

export default ApplicationsBlock;
