import React from "react";
import Image from "next/image";

interface SingleGoalProps {
  goal: string;
  streak: number;
}

export const SingleGoal = ({ goal, streak }: SingleGoalProps) => {
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
