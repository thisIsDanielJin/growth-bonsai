import React from "react";
import { Header } from "../components/Header";

export const App = () => {
  return (
    <div>
      <Header />
      <div className="container h-screen-minus-32 mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl font-bold">Hello, World!</h1>
          <p className="text-lg mt-4">
            This is a Next.js app with Tailwind CSS and DaisyUI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
