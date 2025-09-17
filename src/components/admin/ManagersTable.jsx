import React from "react";
import LoadingButton from "../common/LoadingButton";
import { Link } from "react-router-dom";
import { Edit, Edit2, Trash } from "lucide-react";
import Loader from "../common/Loader";

/**
 * ManagersTable
 * Props:
 * - managers: array of { _id, name, email, phone }
 * - onDelete: async (id) => void
 * - deletingId: string | null
 */
const ManagersTable = ({ managers = [], onDelete, deletingId, loading }) => {
  return (
    <div className="overflow-x-auto bg-secondary rounded shadow">
      <table className="table w-full">
        <thead className="bg-primary text-text-secondary">
          <tr>
            <th className="text-text-secondary">#</th>
            <th className="text-text-secondary">Name</th>
            <th className="text-text-secondary">Email</th>
            <th className="text-text-secondary">Phone</th>
            <th className="text-text-secondary">Status</th>
            <th className="text-right text-text-secondary">Actions</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={6} className="p-0">
                <Loader />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {managers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-text-accent">
                  No managers found.
                </td>
              </tr>
            ) : (
              managers.map((m, idx) => {
                // Zebra style with contrasting text colors:
                // - Even index (first row): dark bg with light text
                // - Odd index: light bg with dark text
                const isDark = idx % 2 === 1;
                const rowClass = isDark
                  ? "bg-primary text-text-secondary"
                  : "bg-secondary text-text-primary";
                return (
                  <tr key={m._id} className={rowClass}>
                    <th>{idx + 1}</th>
                    <td className="font-medium">{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.phone}</td>
                    <td>
                      {m.isVerified ? (
                        <span className="text-success bg-success/40 px-4 py-1 rounded-full">
                          Verified
                        </span>
                      ) : (
                        <span className="text-error bg-error/40 px-4 py-1 rounded-full">
                          Not Verified
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2 justify-end">
                        <Link
                          to={`/admin/managers/update?id=${m._id}`}
                          className={`px-3 py-2 rounded flex items-center justify-center ${
                            isDark
                              ? "bg-secondary/80 text-text-primary hover:bg-secondary"
                              : "bg-primary text-text-secondary hover:bg-primary/80"
                          }`}
                        >
                          <Edit className="h-4 w-4 text-info" />
                        </Link>
                        <LoadingButton
                          className={`px-3 py-2 rounded ${
                            isDark
                              ? "bg-secondary/80 text-text-primary hover:bg-secondary"
                              : "bg-primary text-text-secondary hover:bg-primary/80"
                          }`}
                          isLoading={deletingId === m._id}
                          onClick={() => onDelete?.(m._id)}
                        >
                          <Trash className="h-4 w-4 text-error" />
                        </LoadingButton>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ManagersTable;
