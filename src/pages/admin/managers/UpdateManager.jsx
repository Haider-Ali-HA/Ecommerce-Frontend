import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManagerForm from "../../../components/admin/ManagerForm";
import {
  getManagerById,
  updateManager as updateManagerApi,
} from "../../../services/adminService";
import { updateManagerSchema } from "../../../validation/adminSchemas";
import toast from "react-hot-toast";

const UpdateManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        if (!id) {
          toast.error("Manager id is missing");
          navigate("/admin/managers", { replace: true });
          return;
        }
        setLoading(true);
        const { user, success } = await getManagerById(id);
        if (success && mounted) setManager(user);
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Failed to fetch manager details"
        );
        navigate("/admin/managers", { replace: true });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [id, navigate]);

  const defaults = useMemo(() => {
    if (!manager)
      return {
        name: "",
        email: "",
        phone: "",
        password: "",
        isVerified: false,
      };
    return {
      name: manager.name || "",
      email: manager.email || "",
      phone: manager.phone || "",
      password: "",
      isVerified: Boolean(manager.isVerified),
    };
  }, [manager]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const payload = { ...values };
      const { message, success } = await updateManagerApi(id, payload);
      if (success) {
        toast.success(message || "Manager updated successfully");
        navigate("/admin/managers", { replace: true });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update manager");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-6">
      <ManagerForm
        mode="update"
        schema={updateManagerSchema}
        defaultValues={defaults}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

export default UpdateManager;
