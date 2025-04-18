import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectFilteredGroups,
    selectSelectedGroup,
} from "../../store/selectors";
import { selectGroup } from "../../store/slice";
import { Group } from "../../types";
import * as styles from "./GroupsBlock.module.scss";

const GroupsBlock: React.FC = () => {
    const dispatch = useDispatch();
    const groups = useSelector(selectFilteredGroups);
    const selectedGroup = useSelector(selectSelectedGroup);

    const handleGroupClick = (group: Group) => {
        dispatch(selectGroup(selectedGroup?.id === group.id ? null : group));
    };

    const handleClearFilter = () => {
        dispatch(selectGroup(null));
    };

    return (
        <div className={styles.groupsBlock}>
            <h2>Группы</h2>
            <div className={styles.groupsList}>
                {groups.length > 0 ? (
                    groups.map((group) => (
                        <div
                            key={group.id}
                            className={`${styles.groupItem} ${
                                selectedGroup?.id === group.id
                                    ? styles.selected
                                    : ""
                            }`}
                            onClick={() => handleGroupClick(group)}
                        >
                            {group.caption}
                        </div>
                    ))
                ) : (
                    <p>Нет доступных групп</p>
                )}
            </div>
            {selectedGroup && (
                <button
                    className={styles.clearFilter}
                    onClick={handleClearFilter}
                >
                    Очистить фильтр
                </button>
            )}
        </div>
    );
};

export default GroupsBlock;
