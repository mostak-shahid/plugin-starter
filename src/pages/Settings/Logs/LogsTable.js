import { __ } from "@wordpress/i18n";
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch'; // Added missing apiFetch import
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import ResponsiveTable from "./ResponsiveTable";
import {useWindowWidth} from '../../../lib/Helpers';
import './ResponsiveTable.css'; // Import the CSS file containing media queries
const timeFilterOptions = [
    { label: __('All Time', 'plugin-starter'), value: 'any' },
    { label: __('Today', 'plugin-starter'), value: 'today' },
    { label: __('Last 7 Days', 'plugin-starter'), value: 'week' },
    { label: __('This Month', 'plugin-starter'), value: 'month' },
];
const bulkActions = [
    { label: __('Bulk Action', 'plugin-starter'), value: 'any' },
    { label: __('Delete', 'plugin-starter'), value: 'Delete' },
];
const columns = [
    // { name: 'ID', id: 'ID', selector: row => row.ID, sortable: true },
    { 
        name: 'User', 
        id: 'user_id', 
        // selector: row => row.user_id, 
        cell: (row) => <div><div class="fw-semibold">{row.user_login}</div>ID:({row.user_id})</div>,
        sortable: true 
    },
    { name: 'Email', id: 'user_email', selector: row => row.user_email },
    { name: 'IP Address', id: 'ip', selector: row => row.ip, sortable: true, hide: 'md' },
    { name: 'Category', id: 'category', selector: row => row.category, sortable: true, hide: 'lg', },
    { name: 'Title', id: 'title', selector: row => row.title, sortable: true, omit:true },
    { name: 'Description', id: 'description', selector: row => row.description, sortable: true, omit:true },
    { name: 'User Agent', id: 'user_agent', selector: row => row.user_agent, sortable: true, omit:true },
    { name: 'Date', id: 'created_at', selector: row => row.created_at, sortable: true, hide: 'sm', },
    {
        name: 'Action',
        cell: (row) => <div className="d-flex gap-1"><Button variant="info" size="sm" onClick={() => console.log(row.ID)}><FontAwesomeIcon icon={faEye} /></Button><Button variant="danger" size="sm" onClick={() => console.log(row.ID)}><FontAwesomeIcon icon={faTrash} /></Button></div>,
        ignoreRowClick: true,
        pinned: 'right'
    },
];


// 2. Define the Expanded Component to show hidden column data on mobile
const ExpandedComponent = ({ data }) => (
    <div className="expanded-row-container">
        <p><strong>Title:</strong> {data.title}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>User Agent:</strong> {data.user_agent}</p>
        <p className="show-on-lg"><strong>Category:</strong> {data.category}</p>
        <p className="show-on-md"><strong>IP Address :</strong> {data.ip}</p>
        <p className="show-on-sm"><strong>Date:</strong> {data.created_at}</p>
    </div>
);
/*
{
    "ID": "68",
    "user_id": "1",
    "ip": "::1",
    "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    "title": "Settings Reset",
    "category": "Settings Reset",
    "description": "Reset section: inputs.array_inputs",
    "created_at": "2026-06-12 10:50:13",
    "updated_at": "2026-06-12 10:50:13",
    "user_name": "admin",
    "user_login": "admin",
    "user_email": "mostak.shahid@gmail.com"
}
*/
const LogsTable = () => {
    const { settings, settingsLoading, handleChange } = useOutletContext();

    const width = useWindowWidth();
    // const hasHiddenColumns = width <= 1279; 
    const hasHiddenColumns = true; 

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('any');
    const [dateRange, setDateRange] = useState([]);
    const [sortField, setSortField] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);    
    const [bulkAction, setBulkAction] = useState('any');


    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page,
                per_page: pageSize,
                search: search,
                filter,
                sort_field: sortField,
                sort_order: sortOrder,
            });

            if (dateRange && dateRange.length === 2) {
                const formatDate = (date) => {
                    const d = new Date(date);
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                };
                const startDate = formatDate(dateRange[0]);
                const endDate = formatDate(dateRange[1]);
                console.log('Adding date range:', startDate, endDate);
                params.append('date_from', startDate);
                params.append('date_to', endDate);
            }

            const queryString = params.toString();
            console.log('Fetching logs with params:', queryString);

            const response = await apiFetch({
                path: `/plugin-starter/v1/logs?${queryString}`,
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
        dateRange,
        sortField,
        sortOrder,
    ]);

    return (
        <>
            {/* <ResponsiveTable/>
            <hr/> */}
            <div className="d-flex gap-2 mt-3">
                {timeFilterOptions.map(({ value, label }) => (
                    <Badge
                        bg={value == filter ? "dark" : "secondary"}
                        // text={value == filter ? "light" : "dark"}
                        onClick={() => setFilter(value)}
                        role="button"
                    >
                        {label}
                    </Badge>
                ))}
            </div>
            <Row className="justify-content-between">
                <Col sm='6' lg='3' className="text-center text-lg-start mt-3">
                    <Form.Group>                                               
                        <div className="d-flex align-items-stretch gap-2">
                            <Form.Select
                                value={bulkAction}
                                onChange={(e) => setBulkAction(e.target.value)}
                            >
                                {
                                    bulkActions.map(({ value, label }) => (
                                        <option
                                            value={value}
                                        >
                                            {label}
                                        </option>
                                    ))}
                            </Form.Select>
                            <Button 
                                variant="outline-secondary"
                            >
                                {__('Apply', 'plugin-starter')}
                            </Button>
                        </div>
                    </Form.Group>
                </Col>
                <Col sm='6' lg='3' className="text-center text-lg-end mt-3">
                    <Form.Group>
                        <div className="d-flex align-items-stretch gap-2">
                            <Form.Control
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button 
                                variant="outline-secondary"
                            >
                                {__('Search', 'plugin-starter')}
                            </Button>
                        </div>
                       
                    </Form.Group>
                </Col>
            </Row>
            <div className="table-wrapper responsive-table-wrapper border mt-3">
                <DataTable
                    keyField="id"
                    columns={columns}
                    data={data}
                    selectableRows
                    selectedRows={selectedRowKeys}
                    onSelectedRowsChange={({ selectedRowKeys }) => setSelectedRowKeys(selectedRowKeys)}
                    pagination
                    highlightOnHover
                    // dense


                    // selectableRows
                    // onSelectedRowsChange={({ selectedRows }) => setSelectedUsers(selectedRows.map(r => r.id))}
                    // pagination
                    paginationServer
                    paginationTotalRows={total}
                    onChangePage={(page) => setPage(page)}
                    sortServer
                    onSort={(column, sortDirection) => {
                        setSortField(column.id.toLowerCase().replace(' ', ''));
                        setSortOrder(sortDirection);
                    }}
                    

                    expandableRows={hasHiddenColumns} // Turns off the expander logic entirely if on desktop
                    expandableRowDisabled={row => !hasHiddenColumns} // Hides the ">" arrow icon dynamically per row
                    expandableRowsComponent={ExpandedComponent}
                    responsive
                />

            </div>
        </>
    );
};

export default LogsTable;