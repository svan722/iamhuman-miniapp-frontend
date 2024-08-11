import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeBoard from './pages/WelcomeBoard';
import VerifySuccess from './pages/VerifySuccess';
import LinkVerify from './pages/LinkVerify';
import HelloHuman from './pages/HelloHuman';
import EditProfile from './pages/EditProfile';
import ViewProfile from "./pages/ViewProfile";
import VerifyPassed from './pages/VerifyPassed';
import UpgradePremium from './pages/UpgradePremium';
import Payment from './pages/Payment';
import AccountUpgraded from './pages/AccountUpgraded';
import SelectVerification from './pages/SelectVerification';
import IndividualVerification from './pages/IndividualVerification';
import IndividualActivePortal from './pages/IndividualActivePortal';
import { TelegramProvider } from "./context/TelegramProvider";


function App() {
  return (
    <TelegramProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeBoard />} />
          <Route path="/verifysuccess" element={<VerifySuccess />} />
          <Route path="/linkverify" element={<LinkVerify />} />
          <Route path="/hellohuman" element={<HelloHuman />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/viewprofile" element={<ViewProfile />} />
          <Route path="/verifypassed" element={<VerifyPassed />} />
          <Route path="/upgrade_premium" element={<UpgradePremium />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/account_upgraded" element={<AccountUpgraded />} />
          <Route path="/select_verification" element={<SelectVerification />} />
          <Route path="/individual_verification" element={<IndividualVerification />} />
          <Route path="/individual_active_portal" element={<IndividualActivePortal />} />
        </Routes>
      </Router>
    </TelegramProvider>
  )
}

export default App
