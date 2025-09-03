import { __ } from "@wordpress/i18n";
import { useMain } from '../contexts/MainContext';
import withForm from './withForm';

import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

DataTable.use(DT);

const AjaxTable = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const [statusFilter, setStatusFilter] = useState("publish");
    const [bulkAction, setBulkAction] = useState("");
    const [selectedPosts, setSelectedPosts] = useState([]);

    // Handle bulk action
    const handleBulkAction = async () => {
        if (!bulkAction || selectedPosts.length === 0) {
            alert("Please select posts and choose an action.");
            return;
        }

        for (let postId of selectedPosts) {
            await axios.post(`/wp-json/wp/v2/posts/${postId}`, { status: bulkAction });
        }

        setSelectedPosts([]);
        const table = window.$("#react-posts-table").DataTable();
        table.ajax.reload();
    };

    // Expose for row action buttons
    window.changeStatus = async (postId, newStatus) => {
        await axios.post(`/wp-json/wp/v2/posts/${postId}`, { status: newStatus });
        const table = window.$("#react-posts-table").DataTable();
        table.ajax.reload();
    };

    // Columns
    const columns = [
        {
        data: null,
        title: `<input type="checkbox" id="select-all" />`,
        orderable: false,
        render: (data, type, row) =>
            `<input type="checkbox" class="row-checkbox" data-id="${row.id}" ${
            selectedPosts.includes(row.id) ? "checked" : ""
            } />`
        },
        { data: "id", title: "ID" },
        {
        data: "author",
        title: "Author",
        render: (data, type, row) => {
            const author = row._embedded?.author?.[0];
            return author
            ? `<img src="${author.avatar_urls[24]}" class="rounded-circle me-2" width="24" height="24"/> ${author.name}`
            : "—";
        }
        },
        { data: "title.rendered", title: "Title" },
        {
        data: "categories",
        title: "Category",
        render: (data, type, row) =>
            row._embedded?.["wp:term"]?.[0]?.map((c) => c.name).join(", ") || "—"
        },
        {
        data: "tags",
        title: "Tags",
        render: (data, type, row) =>
            row._embedded?.["wp:term"]?.[1]?.map((t) => t.name).join(", ") || "—"
        },
        { data: "date", title: "Date" },
        {
        data: null,
        title: "Action",
        render: (data, type, row) => `
            <button class="btn btn-sm btn-success me-1" onclick="window.changeStatus(${row.id}, 'publish')">Publish</button>
            <button class="btn btn-sm btn-warning me-1" onclick="window.changeStatus(${row.id}, 'draft')">Draft</button>
            <button class="btn btn-sm btn-danger" onclick="window.changeStatus(${row.id}, 'trash')">Trash</button>
        `
        }
    ];

    // Hook events after table draw
    const onTableDraw = () => {
        // Row checkbox toggle
        document.querySelectorAll(".row-checkbox").forEach((cb) => {
        cb.addEventListener("change", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            setSelectedPosts((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
            );
        });
        });

        // Select All toggle
        const selectAll = document.getElementById("select-all");
        if (selectAll) {
        selectAll.addEventListener("change", (e) => {
            if (e.target.checked) {
            const allIds = Array.from(
                document.querySelectorAll(".row-checkbox")
            ).map((cb) => parseInt(cb.getAttribute("data-id")));
            setSelectedPosts(allIds);
            document.querySelectorAll(".row-checkbox").forEach((cb) => {
                cb.checked = true;
            });
            } else {
            setSelectedPosts([]);
            document.querySelectorAll(".row-checkbox").forEach((cb) => {
                cb.checked = false;
            });
            }
        });
        }
    };

    return (
        <div>
        {/* Filter Links */}
        <div className="mb-3">
            {["publish", "draft", "trash"].map((status) => (
            <a
                key={status}
                href="#"
                onClick={(e) => {
                e.preventDefault();
                setStatusFilter(status);
                const table = window.$("#react-posts-table").DataTable();
                table.ajax.reload();
                }}
                className={`me-3 ${statusFilter === status ? "fw-bold text-primary" : ""}`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </a>
            ))}
        </div>

        {/* Bulk Actions */}
        <div className="mb-3 d-flex">
            <select
            className="form-select w-auto me-2"
            onChange={(e) => setBulkAction(e.target.value)}
            >
            <option value="">Bulk Actions</option>
            <option value="publish">Publish</option>
            <option value="draft">Move to Draft</option>
            <option value="trash">Move to Trash</option>
            </select>
            <button className="btn btn-primary" onClick={handleBulkAction}>
            Apply
            </button>
        </div>

        {/* DataTable */}
        <DataTable
            id="react-posts-table"
            columns={columns}
            options={{
            serverSide: true,
            processing: true,
            ajax: async (data, callback) => {
                const page = data.start / data.length + 1;
                const perPage = data.length;

                let url = `/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&status=${statusFilter}&_embed`;

                if (data.search.value) {
                url += `&search=${encodeURIComponent(data.search.value)}`;
                }

                // Sorting
                if (data.order?.length) {
                const order = data.order[0];
                const colIndex = order.column;
                const dir = order.dir;
                if (columns[colIndex].data === "title.rendered") {
                    url += `&orderby=title&order=${dir}`;
                } else if (columns[colIndex].data === "date") {
                    url += `&orderby=date&order=${dir}`;
                }
                }

                const res = await axios.get(url);
                const total = res.headers["x-wp-total"];

                callback({
                draw: data.draw,
                recordsTotal: total,
                recordsFiltered: total,
                data: res.data
                });
            },
            searching: true,
            order: [[2, "asc"]],
            columnDefs: [
                { targets: [2, 3, 5], orderable: true },
                { targets: "_all", orderable: false }
            ],
            drawCallback: onTableDraw
            }}
            className="table table-striped table-bordered"
        />
        </div>
    );
};
export default withForm(AjaxTable);
