
import { Coins } from "lucide-react";
import { usePointContext } from "../contexts/PointContext";

export const PointDisplay = () => {
  const { userPoints } = usePointContext();
  
  return (
    <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
      <Coins className="h-4 w-4 text-yellow-600" />
      <span className="text-sm font-medium text-yellow-800">
        {userPoints.toLocaleString()}P
      </span>
    </div>
  );
};
