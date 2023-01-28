import React, { useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "./adapters/Axios";

const Home = React.lazy(() => import("./pages/Home"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Leaderboard = React.lazy(() => import("./pages/Leaderboard"));
const Quiz = React.lazy(() => import("./pages/Quiz"));
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const Result = React.lazy(() => import("./pages/Result"));

function App() {
  const [name, setName] = useState();
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const apiData = await axios.get(
      `?${category && `categories=${category}`}&limit=5&region=IN&${
        difficulty && `difficulty=${difficulty}`
      }`
    );
    console.log(apiData);
    setQuestions(apiData);
  };

  return (
    <>
      <div className="container">
        <Suspense
          fallback={
            <CircularProgress
              style={{ margin: 100 }}
              color="inherit"
              size={50}
              thickness={2}
            />
          }
        >
          <Navbar showProfile={showProfile} />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route
              path="/home"
              element={
                <Home
                  name={name}
                  setName={setName}
                  fetchQuestions={fetchQuestions}
                  showProfile={showProfile}
                  setShowProfile={setShowProfile}
                />
              }
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile name={name} />} />

            <Route
              path="/quiz"
              element={
                <Quiz
                  name={name}
                  questions={questions}
                  score={score}
                  setScore={setScore}
                />
              }
            />
            <Route
              path="/result"
              element={<Result name={name} score={score} />}
            />
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
