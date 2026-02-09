import { useState } from "react";
import Header from "./components/Header/Header";
import TopicsSection from "./components/Topics/TopicsSection";

function App() {
  const [completed, setCompleted] = useState(0);
  const TOTAL = 191;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header completed={completed} total={TOTAL} />
      <TopicsSection setCompleted={setCompleted} total={TOTAL} />
    </div>
  );
}

export default App;
