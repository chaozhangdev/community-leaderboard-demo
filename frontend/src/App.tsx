import "./App.css";
import UserCommunityRelationshipManager from "./components/UserCommunityRelationshipManager";
import { Toaster } from "react-hot-toast";

import { useState } from "react";

import Leaderboard from "./pages/Leaderboard";

function App() {
  const [nav, setNav] = useState("leaderboard");

  const JoinTheCommunityJsx = (
    <div className="animate__animated animate__fadeIn">
      <Toaster position="bottom-right" />
      <div className="text-center">
        <a href="https://frameonesoftware.com" target="_blank">
          <img src="/logo.png" className="logo" alt="Frame One Software Logo" />
        </a>
      </div>
      <div>
        <UserCommunityRelationshipManager />
      </div>
    </div>
  );

  const LeaderBoardJsx = <Leaderboard />;

  return (
    <>
      <div className="flex flex-row justify-center items-center mb-10">
        <p
          style={{
            borderBottom: nav === "join" ? "2px solid #fff" : "",
          }}
          className="text-2xl m-4 p-2 cursor-pointer"
          onClick={() => setNav("join")}
        >
          Join the Community
        </p>
        <p
          style={{
            borderBottom: nav === "leaderboard" ? "2px solid #fff" : "",
          }}
          className="text-2xl m-4 p-2 cursor-pointer"
          onClick={() => setNav("leaderboard")}
        >
          View Community Leaderboard
        </p>
      </div>

      {nav === "join" && JoinTheCommunityJsx}
      {nav === "leaderboard" && LeaderBoardJsx}
    </>
  );
}

export default App;
