import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-16 w-full">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
};

export default Loader;
