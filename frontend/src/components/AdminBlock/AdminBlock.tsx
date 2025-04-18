import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedNode } from "../../store/selectors";
import * as styles from "./AdminBlock.module.scss";

const AdminBlock: React.FC = () => {
    const selectedNode = useSelector(selectSelectedNode);
    const admin = selectedNode?.admin;

    if (!selectedNode) {
        return (
            <div className={styles.adminBlock}>
                <h2>Администратор</h2>
                <p className={styles.noNode}>
                    Выберите ноду для просмотра информации об администраторе
                </p>
            </div>
        );
    }
    return (
        <div className={styles.adminBlock}>
            <h2>Администратор</h2>
            {admin ? (
                <div className={styles.adminInfo}>
                    <p>
                        <span>Имя:</span> {admin.name}
                    </p>
                    <p>
                        <span>Email:</span> {admin.email}
                    </p>
                </div>
            ) : (
                <p>Администратор не назначен</p>
            )}
        </div>
    );
};

export default AdminBlock;
