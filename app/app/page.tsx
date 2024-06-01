import React from "react";
import { AppHeader } from "../components/AppHeader";
import { GoalTracker } from "../components/GoalTracker";
import { Bonsai } from "../components/Bonsai";

const Application = () => {
  return (
    <>
      <AppHeader />
      <div
        className=" flex flex-row w-full"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <section className="w-1/4 bg-gray-200 h-full"></section>
        <section className="w-1/2  h-full">
          <GoalTracker />
        </section>
        <section className="w-1/4 bg-gray-200 h-full">
          <Bonsai />
        </section>
      </div>
    </>
  );
};

export default Application;
