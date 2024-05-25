import React from "react";
import { AppHeader } from "../components/AppHeader";

export const App = () => {
  return (
    <div>
      <AppHeader />
      <div className="container h-screen-minus-32"></div>
    </div>
  );
};

export default App;
