import React from "react";

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 w-full h-24 bg-primary">
      <div className="relative w-full h-full px-32 flex items-center justify-between">
        <div className="flex items-center">
          <p className="font-bold text-2xl">GrowthBonsai</p>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-row items-center space-x-10 font-medium text-lg">
          <p>Home</p>
          <p>About</p>
          <p>Contact</p>
        </div>

        <div>
          <div className="btn btn-accent">
            <p>Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};
