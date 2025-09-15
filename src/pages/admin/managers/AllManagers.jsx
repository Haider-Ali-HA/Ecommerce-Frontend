import React, { useEffect, useState } from "react";
import { getAllManagers, deleteManager } from "../../../services/adminService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ManagersTable from "../../../components/admin/ManagersTable";
import Pagination from "../../../components/common/Pagination"; // <-- Our new component
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import Loader from "../../../components/common/Loader";

const AllManagers = () => {
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);
  const [managers, setManagers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // default limit
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });

  const fetchManagers = async () => {
    try {
      setLoading(true);
      const {
        managers: list,
        pagination: meta,
        success,
      } = await getAllManagers(page, limit);

      if (success) {
        setManagers(list || []);

        // Normalize pagination meta from backend to a consistent shape.
        // Different APIs may use different keys (total, totalDocs, count, etc.).
        const normalized = {
          totalPages: meta?.totalPages ?? meta?.pages ?? 1,
          total: meta?.total ?? meta?.totalDocs ?? meta?.count ?? 0,
          limit: meta?.limit ?? limit,
        };

        setPagination(normalized);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load managers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, [page]); // Fetch data whenever the page changes

  // Open confirmation modal when delete is requested from the table
  const onDeleteRequest = (id) => {
    setTargetDeleteId(id);
    setConfirmOpen(true);
  };

  // Actual delete triggered from confirmation modal
  const confirmDelete = async () => {
    if (!targetDeleteId) return;
    try {
      setDeletingId(targetDeleteId);
      const { message, success } = await deleteManager(targetDeleteId);
      if (success) {
        toast.success(message || "Manager deleted successfully");
        setConfirmOpen(false);

        // Compute last page after deletion: lastPage = ceil((total - 1)/limit)
        const totalAfter = (pagination.total ?? 0) - 1;
        const limitPerPage = pagination.limit ?? limit;
        const lastPageAfter = Math.max(1, Math.ceil(totalAfter / limitPerPage));

        if (page > lastPageAfter) {
          // If current page would no longer exist, go back one page.
          setPage(lastPageAfter); // useEffect will refetch for us
        } else {
          // Stay on the same page and refetch so it fills up to `limit`
          await fetchManagers();
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete manager");
    } finally {
      setDeletingId(null);
      setTargetDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">All Managers</h1>
        <Link
          to="/admin/managers/add"
          className="px-4 py-2 rounded bg-primary text-text-secondary hover:bg-primary/80"
        >
          Add Manager
        </Link>
      </div>

        <>
          <ManagersTable
            managers={managers}
            onDelete={onDeleteRequest}
            deletingId={deletingId}
            loading={loading}
          />
          <ConfirmationModal
            isOpen={confirmOpen}
            title="Delete Manager"
            message="Are you sure you want to delete this manager? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={confirmDelete}
            onCancel={() => setConfirmOpen(false)}
            loading={deletingId !== null}
          />
          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
            totalRecords={pagination.total ?? pagination.totalRecords ?? 0}
            pageSize={pagination.limit ?? limit}
          />
        </>

    </div>
  );
};

export default AllManagers;
