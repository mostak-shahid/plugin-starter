import React, { useRef } from 'react';
import { Typography, Divider } from '@douyinfe/semi-ui';
import LogsCharts from './LogsCharts';
import LogsTable from './LogsTable';

const { Title } = Typography;

export default function Logs() {
    const chartsRef = useRef(null);

    const handleDataRefresh = () => {
        if (chartsRef.current && chartsRef.current.fetchChartsData) {
            chartsRef.current.fetchChartsData();
        }
    };

    return (
        <div>
            <LogsCharts ref={chartsRef} />

            <Divider margin="12px" />
            <Title heading={5}>Logs Data</Title>
            <Divider margin="12px" />

            <LogsTable onDataRefresh={handleDataRefresh} />
        </div>
    );
}
