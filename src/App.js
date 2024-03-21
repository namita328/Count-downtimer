import "./App.css";
import React, { useState } from "react";
import Input from "./components/Input/Input";

function App() {
  const [targetDate, setTargetDate] = useState("");

  return (
    <div className="App">
      <Input targetDate={targetDate} setTargetDate={setTargetDate} />
    </div>
  );
}

export default App;
