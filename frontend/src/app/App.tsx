import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadInfrastructureData } from "../store/actions";
import { AppDispatch } from "../store/store";
import { selectLoading, selectError } from "../store/selectors";
import StatusBlock from "../components/StatusBlock/StatusBlock";
import SummaryBlock from "../components/SummaryBlock/SummaryBlock";
import GroupsBlock from "../components/GroupsBlock/GroupsBlock";
import NodesBlock from "../components/NodesBlock/NodesBlock";
import InterfaceBlock from "../components/InterfaceBlock/InterfaceBlock";
import AdminBlock from "../components/AdminBlock/AdminBlock";
import ApplicationsBlock from "../components/ApplicationsBlock/ApplicationsBlock";
import MetricsBlock from "../components/MetricsBlock/MetricsBlock";
import * as styles from "./App.module.scss";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(loadInfrastructureData());

        const interval = setInterval(() => {
            dispatch(loadInfrastructureData());
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch]);

    if (loading && !error) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (error) {
        return <div className={styles.error}>Ошибка: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Infrasrtucture-App</h1>
            </header>
            <main className={styles.main}>
                <div className={styles.column}>
                    <div className={styles.block}>
                        <StatusBlock />
                    </div>
                    <div className={styles.block}>
                        <SummaryBlock />
                    </div>
                    <div className={styles.block}>
                        <GroupsBlock />
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.block}>
                        <NodesBlock />
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.block}>
                        <MetricsBlock />
                    </div>
                    <div className={styles.block}>
                        <InterfaceBlock />
                    </div>
                    <div className={styles.block}>
                        <AdminBlock />
                    </div>
                    <div className={styles.block}>
                        <ApplicationsBlock />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
