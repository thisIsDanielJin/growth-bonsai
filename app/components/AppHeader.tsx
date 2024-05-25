"use client";
import React from "react";
import Image from "next/image";
import { AuthButton } from "./AuthButton";

export const AppHeader = () => {
  return (
    <div className="sticky top-0 z-50 w-full h-24 bg-primary">
      <div className="relative w-full h-full px-32 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex">
            <Image
              src="/SeedlingEmoji.png"
              alt="SeedlingEmoji"
              width={30}
              height={20}
              className="mr-2"
            />
            <p className="font-bold text-2xl">GrowthBonsai</p>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-row items-center space-x-10 font-medium text-lg">
          <p>GrowthTracker</p>
          <p>Profile</p>
        </div>

        <div>
          <AuthButton />
        </div>
      </div>
    </div>
  );
};
