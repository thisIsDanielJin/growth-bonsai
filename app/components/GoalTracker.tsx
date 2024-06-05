"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SingleGoal } from "./SingleGoal";
import { useSession } from "next-auth/react";
import useProgressTracker from "@/hooks/useProgressTracker";
import { Goal } from "@/types/types";

export const GoalTracker = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const progressTracker = useProgressTracker(userId, shouldRefetch);
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (shouldRefetch) {
      setShouldRefetch(false); // Reset refetch flag after fetching
    }
  }, [progressTracker, shouldRefetch]);

  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleAddGoal = async () => {
    if (progressTracker && newGoalDescription.trim() !== "") {
      const response = await fetch("/api/addGoal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          progressTrackerId: progressTracker._id,
          description: newGoalDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setNewGoalDescription("");
        setSuccessMessage("Goal added successfully!");
        setShouldRefetch(true); // Trigger refetch

        setTimeout(() => setSuccessMessage(""), 10000); // Clear success message after 10 seconds
      } else {
        console.error("Failed to add goal");
      }
    }
  };

  return (
    <div className="h-full flex flex-col px-5">
      <div className="h-16 flex justify-between items-center my-5">
        <div className="flex-grow text-start">
          <p className="font-bold text-xl">Longest Streak: 10 days</p>
        </div>
        <button className="btn btn-accent p-2">
          <Image src="/icons/edit.svg" alt="editIcon" width={30} height={30} />
        </button>
      </div>
      <div className="h-full">
        {progressTracker?.goals.map((goal: Goal, index) => (
          <SingleGoal
            key={goal._id}
            goal={goal.description}
            streak={goal.check_history.length}
            _id={goal._id}
          />
        ))}
      </div>
      <div className="h-16 flex justify-center items-center mb-2">
        <button className="btn btn-accent px-1" onClick={handleOpenModal}>
          <Image
            src="/icons/addIcon.svg"
            alt="addIcon"
            width={45}
            height={45}
          />
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2 text-center">
              Add a New Goal
            </h3>
            <input
              type="text"
              value={newGoalDescription}
              onChange={(e) => setNewGoalDescription(e.target.value)}
              placeholder="Enter goal description"
              className="input input-bordered w-full "
            />
            <div className="modal-action flex flex-col items-end">
              <div className="flex ">
                <button className="btn btn-accent" onClick={handleAddGoal}>
                  Add Goal
                </button>
                <button
                  className="btn ml-2"
                  onClick={() =>
                    (
                      document.getElementById("my_modal_1") as HTMLDialogElement
                    ).close()
                  }
                >
                  Close
                </button>
              </div>
              {successMessage && (
                <p className="text-green-500 mt-2">{successMessage}</p>
              )}
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
