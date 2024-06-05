"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SingleGoalProps {
  goal: string;
  streak: number;
  _id: string;
}

export const SingleGoal = ({ goal, streak, _id }: SingleGoalProps) => {
  const [todayChecked, setTodayChecked] = useState<boolean>(false);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`/api/checkGoalChecked/${_id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (data && data.today_checked !== undefined) {
          setTodayChecked(data.today_checked);
        }
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };

    fetchGoal();
  }, [_id, todayChecked]);

  return (
    <div className="h-16 bg-secondary rounded-full flex items-center px-5 justify-between mb-3">
      <p className="text-lg">{goal}</p>
      <div className="flex flex-row space-x-5 items-center">
        <input type="checkbox" defaultChecked className="checkbox" />
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
