import React, { useEffect, useState } from "react";
import { getAllManagers, deleteManager } from "../../../services/adminService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ManagersTable from "../../../components/admin/ManagersTable";

const AllManagers = () => {
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [managers, setManagers] = useState([]);
  console.log(managers);

  const fetchManagers = async () => {
    try {
      setLoading(true);
      const { managers: list, success } = await getAllManagers();
      if (success) setManagers(list || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load managers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const onDelete = async (id) => {
    try {
      if (!confirm("Are you sure you want to delete this manager?")) return;
      setDeletingId(id);
      const { message, success } = await deleteManager(id);
      if (success) {
        toast.success(message || "Manager deleted successfully");
        setManagers((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete manager");
    } finally {
      setDeletingId(null);
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

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <ManagersTable
          managers={managers}
          onDelete={onDelete}
          deletingId={deletingId}
        />
      )}
    </div>
  );
};

export default AllManagers;
