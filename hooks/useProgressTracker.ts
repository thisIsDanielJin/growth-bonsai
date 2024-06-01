import { useEffect, useState } from "react";
import { Goal } from "@/types/types";

const useProgressTracker = (
  userId: string | undefined,
  shouldRefetch: boolean
) => {
  const [tracker, setTracker] = useState<{ _id: string; goals: Goal[] } | null>(
    null
  );

  useEffect(() => {
    const fetchProgressTracker = async () => {
      if (userId) {
        const response = await fetch("/api/progressTracker", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          const data = await response.json();
          setTracker(data.tracker);
        } else {
          console.error("Failed to fetch progress tracker");
        }
      }
    };

    fetchProgressTracker();
  }, [userId, shouldRefetch]);

  return tracker;
};

export default useProgressTracker;
