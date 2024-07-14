import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeBoard from './pages/WelcomeBoard';
import VerifySuccess from './pages/VerifySuccess';
import HelloHuman from './pages/HelloHuman';
import Profile from "./pages/Profile";
import VerifyPassed from './pages/VerifyPassed';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeBoard />} />
          <Route path="/verifysuccess" element={<VerifySuccess />} />
          <Route path="/hellohuman" element={<HelloHuman />} />
          <Route path="/editprofile" element={<Profile />} />
          <Route path="/verifypassed" element={<VerifyPassed />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
