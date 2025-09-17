import React, { useEffect, useState } from "react";
import {
  getAllManagers,
  deleteManager,
  searchManagersData,
} from "../../../services/adminService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ManagersTable from "../../../components/admin/ManagersTable";
import Pagination from "../../../components/common/Pagination"; // <-- Our new component
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import SearchInputField from "../../../components/common/SearchInputField";
import { Search } from "lucide-react";
import DropDown from "../../../components/common/DropDown";

const AllManagers = () => {
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);
  const [managers, setManagers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // default limit
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = async (query) => {
    setSearchQuery(query);

    try {
      const data = await searchManagersData(query, selectedStatus, page, limit);

      setManagers(data.managers || []);
      setPagination({
        totalPages: data.pagination?.totalPages ?? 1,
        total: data.pagination?.total ?? 0,
        limit: data.pagination?.limit ?? limit,
      });
    } catch (error) {
      toast.error("Search failed. Please try again.");
      console.error("Search error:", error);
    }
    // Implement search functionality here, e.g., call a search API
    // For now, just log the query
  };

  // getManagersByStatus
  const handleStatusFilter = async (status) => {
    setSelectedStatus(status);
    try {
      const data = await searchManagersData(searchQuery, status, page, limit);
      setManagers(data.managers || []);
      setPagination({
        totalPages: data.pagination?.totalPages ?? 1,
        total: data.pagination?.total ?? 0,
        limit: data.pagination?.limit ?? limit,
      });
    } catch (error) {
      toast.error("Failed to filter managers by status");
      console.error("Status filter error:", error);
    }
  };
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    handleStatusFilter(status);
  };

  return (
    <div className="min-h-screen mt-6 space-y-4">
      <div className="flex items-center justify-center md:justify-between w-full flex-col md:flex-row gap-4">
        <h1 className="text-2xl font-bold text-center md:text-start  text-text-primary   h-full w-full">
          All Managers
        </h1>
        {/* Add search input */}

        <div className="flex items-center gap-2 w-full flex-col md:flex-row     ">
          <div className="w-full ">
            <SearchInputField
              type="text"
              placeholder="Search Managers..."
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-primary outline-none w-full "
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          
          <div className="flex gap-2   w-full">
            <DropDown
              className="bg-primary !outline-none  w-full md:w-fit "
              onStatusChange={handleStatusChange}
            />
            <Link
              to="/admin/managers/add"
              className="px-4 py-2 w-full md:min-w-38 rounded text-center bg-primary text-text-secondary hover:bg-primary/80"
            >
              Add Manager
            </Link>
          </div>
        </div>
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
