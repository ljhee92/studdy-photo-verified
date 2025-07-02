
import { Coins } from "lucide-react";
import { mockCurrentUser } from "../data/mockPointData";

export const PointDisplay = () => {
  return (
    <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
      <Coins className="h-4 w-4 text-yellow-600" />
      <span className="text-sm font-medium text-yellow-800">
        {mockCurrentUser.points.toLocaleString()}P
      </span>
    </div>
  );
};
