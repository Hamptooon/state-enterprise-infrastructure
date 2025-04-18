import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedNode } from "../../store/selectors";
import * as styles from "./InterfaceBlock.module.scss";

const InterfaceBlock: React.FC = () => {
    const selectedNode = useSelector(selectSelectedNode);
    const nodeInterface = selectedNode?.interface;
    if (!selectedNode) {
        return (
            <div className={styles.interfacesBlock}>
                <h2>Интерфейс</h2>
                <p className={styles.noNode}>
                    Выберите ноду для просмотра информации об администраторе
                </p>
            </div>
        );
    }
    return (
        <div className={styles.interfacesBlock}>
            <h2>Интерфейс</h2>
            {nodeInterface ? (
                <div className={styles.interfaceInfo}>
                    <p>
                        <span>Название:</span> {nodeInterface.caption}
                    </p>
                    <p>
                        <span>Статус: </span>
                        <span
                            style={{
                                color: nodeInterface.statusColor || "#000",
                            }}
                        >
                            {nodeInterface.statusDescription || "Нет данных"}
                        </span>
                    </p>
                </div>
            ) : (
                <p>Интерфейс не выбран</p>
            )}
        </div>
    );
};

export default InterfaceBlock;
