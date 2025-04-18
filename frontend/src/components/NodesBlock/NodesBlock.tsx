import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectFilteredNodes,
    selectSelectedNode,
    selectSelectedGroup,
} from "../../store/selectors";
import { selectNode } from "../../store/slice";
import NodeBlock from "./NodeBlock/NodeBlock";
import * as styles from "./NodesBlock.module.scss";

const NodesBlock: React.FC = () => {
    const dispatch = useDispatch();
    const nodes = useSelector(selectFilteredNodes);
    const selectedGroup = useSelector(selectSelectedGroup);
    const selectedNode = useSelector(selectSelectedNode);
    const handleClearFilter = () => {
        dispatch(selectNode(null));
    };

    return (
        <div className={styles.nodesBlock}>
            <div className={styles.header}>
                <h2>Ноды</h2>
                {selectedNode && !selectedGroup && (
                    <button
                        className={styles.clearFilter}
                        onClick={handleClearFilter}
                    >
                        Очистить фильтр
                    </button>
                )}
            </div>

            <div className={styles.nodesList}>
                {nodes.length > 0 ? (
                    nodes.map((node) => <NodeBlock key={node.id} node={node} />)
                ) : (
                    <p className={styles.empty}>Нет доступных нод</p>
                )}
            </div>
        </div>
    );
};

export default NodesBlock;
