import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import {
    Table,
    Input,
    Select,
    Space,
    Button,
    Typography,
    Spin,
    LocaleProvider,
    Tag,
    Avatar,
    Tooltip,
    Popconfirm,
    Card,
    Layout,
    Row,
    Col,
    Divider,
} from '@douyinfe/semi-ui';
import {
    IconSearch,
    IconDownload,
    IconDelete,
    IconUser,
    IconLock,
    IconEdit,
    IconPlus,
    IconSetting,
    IconCode,
    IconFile,
    IconAlertTriangle,
} from '@douyinfe/semi-icons';
import { VChart } from '@visactor/react-vchart';
import { registerTheme } from '@visactor/vchart';
import '@visactor/vchart-semi-theme';

registerTheme('semi', { theme: 'semi' });

const filterList = [
    { name: __( 'All', 'plugin-starter' ), value: 'any' },
    { name: __( 'Today', 'plugin-starter' ), value: 'today' },
    { name: __( 'Last 7 days', 'plugin-starter' ), value: 'week' },
    { name: __( 'This Month', 'plugin-starter' ), value: 'month' },
];
const { Text, Title } = Typography;
export default function Logs() {
    const [ data, setData ] = useState( [] );
    const [ loading, setLoading ] = useState( false );
    const [ page, setPage ] = useState( 1 );
    const [ pageSize, setPageSize ] = useState( 20 );
    const [ total, setTotal ] = useState( 0 );
    const [ search, setSearch ] = useState( '' );
    const [ filter, setFilter ] = useState( 'any' );
    const [ sortField, setSortField ] = useState( 'created_at' );
    const [ sortOrder, setSortOrder ] = useState( 'DESC' );
    const [ selectedRowKeys, setSelectedRowKeys ] = useState( [] );
    const [ chartsLoading, setChartsLoading ] = useState( true );
    const [ chartsData, setChartsData ] = useState({
        overTime: [],
        byCategory: [],
        topUsers: [],
        topIps: [],
        hourlyActivity: [],
    });

    const handleEdit = (record) => {
        console.log('Edit:', record);
    };

    const handleDelete = async (id) => {
        try {
            await apiFetch({
                path: `/plugin-starter/v1/logs/${id}`,
                method: 'DELETE',
            });
            fetchData();
            fetchChartsData();
        } catch (error) {
            console.error('Error deleting log:', error);
        }
    };

	const fetchData = async () => {
		setLoading( true );
		try {
			const params = new URLSearchParams( {
				page,
				per_page: pageSize,
				search: encodeURIComponent( search ),
				filter,
				sort_field: sortField,
				sort_order: sortOrder,
			} );
			const response = await apiFetch( {
				path: `/plugin-starter/v1/logs?${ params.toString() }`,
			} );
			setData( response.data || [] );
			setTotal( response.total || 0 );
		} catch ( error ) {
			console.error( 'Error fetching logs:', error );
		} finally {
			setLoading( false );
		}
	};

    const fetchChartsData = async () => {
        setChartsLoading(true);
        try {
            const [overTime, byCategory, topUsers, topIps, hourlyActivity] = await Promise.all([
                apiFetch({ path: '/plugin-starter/v1/logs/stats/over-time' }),
                apiFetch({ path: '/plugin-starter/v1/logs/stats/by-category' }),
                apiFetch({ path: '/plugin-starter/v1/logs/stats/top-users' }),
                apiFetch({ path: '/plugin-starter/v1/logs/stats/top-ips' }),
                apiFetch({ path: '/plugin-starter/v1/logs/stats/hourly-activity' }),
            ]);

            setChartsData({
                overTime: overTime.data || [],
                byCategory: byCategory.data || [],
                topUsers: topUsers.data || [],
                topIps: topIps.data || [],
                hourlyActivity: hourlyActivity.data || [],
            });
        } catch (error) {
            console.error('Error fetching charts data:', error);
        } finally {
            setChartsLoading(false);
        }
    };

    useEffect( () => {
        fetchData();
        fetchChartsData();
    }, [
        page,
        pageSize,
        search,
        filter,
        sortField,
        sortOrder,
    ] );

    const overTimeSpec = {
        type: 'line',
        theme: 'semi',
        data: {
            values: chartsData.overTime.map(item => ({ date: item.date, total: item.total }))
        },
        xField: 'date',
        yField: 'total',
        title: { text: 'Logs Over Time' },
        point: { size: 5 },
        smooth: true,
    };

    const byCategorySpec = {
        type: 'bar',
        theme: 'semi',
        data: {
            values: chartsData.byCategory.map(item => ({ category: item.category, total: item.total }))
        },
        xField: 'category',
        yField: 'total',
        title: { text: 'Logs by Category' },
        label: { visible: true },
        axis: {
            y: {
                label: { autoHide: true, autoRotate: true }
            }
        }
    };

    const topUsersSpec = {
        type: 'bar',
        theme: 'semi',
        data: {
            values: chartsData.topUsers.map(item => ({ user: item.display_name || `User ${item.user_id}`, total: item.total }))
        },
        xField: 'user',
        yField: 'total',
        title: { text: 'Top 10 Users' },
        label: { visible: true },
        axis: {
            y: {
                label: { autoHide: true, autoRotate: true }
            }
        }
    };

    const categoryPieSpec = {
        type: 'pie',
        theme: 'semi',
        data: {
            values: chartsData.byCategory.map(item => ({ category: item.category, total: item.total }))
        },
        valueField: 'total',
        categoryField: 'category',
        title: { text: 'Category Share' },
        label: { visible: true },
        outerRadius: 0.8,
        innerRadius: 0.5,
        pie: {
            state: {
                hover: { stroke: '#000', lineWidth: 1 }
            }
        },
    };

    const topIpsSpec = {
        type: 'bar',
        theme: 'semi',
        data: {
            values: chartsData.topIps.map(item => ({ ip: item.ip, total: item.total }))
        },
        xField: 'ip',
        yField: 'total',
        title: { text: 'Top 10 IPs' },
        label: { visible: true },
        axis: {
            y: {
                label: { autoHide: true, autoRotate: true }
            }
        }
    };

    const hourlyActivitySpec = {
        type: 'bar',
        theme: 'semi',
        data: {
            values: chartsData.hourlyActivity.map(item => ({ hour: `${item.hour}:00`, total: item.total }))
        },
        xField: 'hour',
        yField: 'total',
        title: { text: 'Hourly Activity' },
        label: { visible: true },
        axis: {
            y: {
                label: { autoHide: true, autoRotate: true }
            }
        }
    };

    // Table columns definition
    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            width: 80,
            sorter: true,
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'User',
            dataIndex: 'user_name',
            key: 'user_name',
            width: 150,
            sorter: true,
            render: (text, record) => (
                <div>
                <Text strong>{text || 'Unknown'}</Text>
                <br />
                <Text type="tertiary" size="small">
                    ID: {record.user_id}
                </Text>
                </div>
            ),
        },
        {
            title: 'IP Address',
            dataIndex: 'ip',
            key: 'ip',
            width: 140,
            sorter: true,
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 140,
            render: (text) => <Tag color="success">{text}</Tag>,
            sorter: true,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 250,
            ellipsis: { showTitle: true },
            sorter: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            ellipsis: { showTitle: true },
            render: (text) => (
                <Text ellipsis={{ showTooltip: true }} style={{ width: 280 }}>
                {text}
                </Text>
            ),
        },
        {
            title: 'User Agent',
            dataIndex: 'user_agent',
            key: 'user_agent',
            width: 200,
            ellipsis: { showTitle: true },
            render: (text) => (
                <Text ellipsis={{ showTooltip: true }} type="tertiary" size="small">
                {text}
                </Text>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 180,
            sorter: true,
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                <Button
                    icon={<IconEdit />}
                    type="tertiary"
                    size="small"
                    onClick={() => handleEdit(record)}
                />
                <Popconfirm
                    title="Are you sure you want to delete this log?"
                    onConfirm={() => handleDelete(record.ID)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                    icon={<IconDelete />}
                    type="danger"
                    theme="borderless"
                    size="small"
                    />
                </Popconfirm>
                </Space>
            ),
        },
    ];

 	const rowSelection = {
 		selectedRowKeys,
 		onChange: ( keys ) => setSelectedRowKeys( keys ),
 		getCheckboxProps: ( record ) => ( {
 			name: record.id,
 		} ),
 	};

 	const handleTableChange = ( { pagination, sorter } ) => {
 		if ( pagination ) {
 			setPage( pagination.currentPage );
 			setPageSize( pagination.pageSize );
 		}
 		if ( sorter ) {
 			setSortField( sorter.dataIndex );
 			setSortOrder( sorter.sortOrder === 'ascend' ? 'ASC' : 'DESC' );
 		}
 	};

    return (
        <div>
            <Title heading={5}>Logs Statistics</Title>
            <Divider margin="12px" />
            <Spin spinning={chartsLoading}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card style={{ marginBottom: 16 }} bodyStyle={{padding: 0}}>
                            <VChart spec={overTimeSpec} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{ marginBottom: 16 }} bodyStyle={{padding: 0}}>
                            <VChart spec={byCategorySpec} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{ marginBottom: 16 }} bodyStyle={{padding: 0}}>
                            <VChart spec={topUsersSpec} />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card style={{ marginBottom: 16 }} bodyStyle={{padding: 0}}>
                            <VChart spec={categoryPieSpec} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{ marginBottom: 16 }} bodyStyle={{padding: 0}}>
                            <VChart spec={topIpsSpec} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{ marginBottom: 16 }} bodyStyle={{padding: 0}}>
                            <VChart spec={hourlyActivitySpec} />
                        </Card>
                    </Col>
                </Row>
            </Spin>

            <Divider margin="12px" />
            <Title heading={5}>Logs Data</Title>
            <Divider margin="12px" />
            <Space vertical>
                <Input
                    prefix={ <IconSearch /> }
                    placeholder={ __( 'Search…', 'plugin-starter' ) }
                    value={ search }
                    onChange={ ( value ) => {
                        setSearch( value );
                        setPage( 1 );
                    } }
                    showClear
                    style={ { width: 300 } }
                />
            </Space>
            <Spin spinning={ loading }>
                <Table
                    columns={ columns }
                    dataSource={ data }
                    rowKey="ID"
                    rowSelection={rowSelection}
                    scroll={{ y: 'calc(100vh - 700px)' }}
                    pagination={ {
                        currentPage: page,
                        pageSize,
                        total,
                        pageSizeOpts: [ 10, 20, 50, 100 ],
                        showSizeChanger: true,
                    } }
                    onChange={ handleTableChange }
                    bordered
                    size="small"
                />
            </Spin>
        </div>
    )
}
