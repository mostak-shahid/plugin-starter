import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import {
    Table,
    Input,
    Space,
    Button,
    Typography,
    Spin,
    Tag,
    Popconfirm,
} from '@douyinfe/semi-ui';
import {
    IconSearch,
    IconDelete,
    IconEdit,
} from '@douyinfe/semi-icons';

const { Text } = Typography;

export default function LogsTable({ onDataRefresh }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('any');
    const [sortField, setSortField] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
            if (onDataRefresh) {
                onDataRefresh();
            }
        } catch (error) {
            console.error('Error deleting log:', error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page,
                per_page: pageSize,
                search: encodeURIComponent(search),
                filter,
                sort_field: sortField,
                sort_order: sortOrder,
            });
            const response = await apiFetch({
                path: `/plugin-starter/v1/logs?${params.toString()}`,
            });
            setData(response.data || []);
            setTotal(response.total || 0);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [
        page,
        pageSize,
        search,
        filter,
        sortField,
        sortOrder,
    ]);

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
        onChange: (keys) => setSelectedRowKeys(keys),
        getCheckboxProps: (record) => ({
            name: record.id,
        }),
    };

    const handleTableChange = ({ pagination, sorter }) => {
        if (pagination) {
            setPage(pagination.currentPage);
            setPageSize(pagination.pageSize);
        }
        if (sorter) {
            setSortField(sorter.dataIndex);
            setSortOrder(sorter.sortOrder === 'ascend' ? 'ASC' : 'DESC');
        }
    };

    return (
        <div>
            <div className="flex justify-center md:justify-between">
                <div className="table-action-left text-center md:text-left">
                    <div>All/Today/This Week/This Month</div>
                    <div className="bulk-actions">Select field with a button for delete selected rows</div>
                </div>
                <div className="table-action-right text-center md:text-right">
                    <div>
                        <Input
                            prefix={<IconSearch />}
                            placeholder={__('Search…', 'plugin-starter')}
                            value={search}
                            onChange={(value) => {
                                setSearch(value);
                                setPage(1);
                            }}
                            showClear
                            style={{ width: 300 }}
                        />
                    </div>
                    <div>Date range filter</div>
                </div>
            </div>
            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="ID"
                    rowSelection={rowSelection}
                    // scroll={{ y: 'calc(100vh - 700px)' }}
                    scroll={{ y: '600px' }}
                    pagination={{
                        currentPage: page,
                        pageSize,
                        total,
                        pageSizeOpts: [10, 20, 50, 100],
                        showSizeChanger: true,
                    }}
                    onChange={handleTableChange}
                    bordered
                    size="small"
                />
            </Spin>
        </div>
    );
}
