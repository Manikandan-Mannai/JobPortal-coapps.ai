import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindJobs from "./pages/FindJobs";
import Navbar from "./component/Navbar"
import JobUpload from "./component/JobUpload";
import Companies from "./pages/Companies";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<FindJobs />} />
          <Route path="/jobUpload" element={<JobUpload />}></Route>
          <Route path="/companies" element={<Companies />}></Route>
          <Route path="/user" element={<Profile />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
