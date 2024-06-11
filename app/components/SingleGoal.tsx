"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SingleGoalProps {
  goal: string;
  streak: number;
  _id: string;
  istodayChecked: boolean;
}

export const SingleGoal = ({
  goal,
  streak,
  _id,
  istodayChecked,
}: SingleGoalProps) => {
  const [todayChecked, setTodayChecked] = useState<boolean>(istodayChecked);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`/api/checkGoalChecked/?id=${_id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.today_checked !== undefined) {
          setTodayChecked(data.today_checked);
        }
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };

    fetchGoal();
  }, [_id]);

  const handleCheckboxChange = async () => {
    const newCheckedStatus = !todayChecked;
    setTodayChecked(newCheckedStatus);

    try {
      const response = await fetch(`/api/updateGoal/?id=${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ today_checked: newCheckedStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      // Optionally, revert the state if the update fails
      setTodayChecked(!newCheckedStatus);
    }
  };

  return (
    <div className="h-16 bg-secondary rounded-full flex items-center px-5 justify-between mb-3">
      <p className="text-lg">{goal}</p>
      <div className="flex flex-row space-x-5 items-center">
        <input
          type="checkbox"
          checked={todayChecked}
          className="checkbox"
          onChange={handleCheckboxChange}
        />
        <div className="flex flex-row items-center">
          <p className="font-bold">{streak}</p>
          <Image
            src="icons/streak.svg"
            alt="streakIcon"
            width={35}
            height={35}
          />
        </div>
      </div>
    </div>
  );
};
