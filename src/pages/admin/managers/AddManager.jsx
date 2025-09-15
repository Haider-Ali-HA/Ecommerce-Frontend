import React, { useState } from "react";
import ManagerForm from "../../../components/admin/ManagerForm";
import { createManager } from "../../../services/adminService";
import { createManagerSchema } from "../../../validation/adminSchemas";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddManager = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      // Backend expects role in body; set manager role explicitly
      const payload = { ...values, role: "manager" };
      const { message, success } = await createManager(payload);
      if (success) {
        toast.success(message || "Manager created successfully");
        navigate("/admin/managers", { replace: true });
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to create manager";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-6">
      {/* Card heading uses project color classes like text-text-primary */}
      <ManagerForm
        mode="create"
        schema={createManagerSchema}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

export default AddManager;
