import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CampaignList } from "./screens/CampaignList";
import { Dashboard } from "./screens/Dashboard";
import { Navbar } from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/dashboard/:cid" element={<Dashboard />} />
          <Route path="/" element={<CampaignList />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
