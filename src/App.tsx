import './App.css';
import { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeBoard from './pages/WelcomeBoard';
import VerifySuccess from './pages/VerifySuccess';
import LinkVerify from './pages/LinkVerify';
import LinkVerifyBack from './pages/LinkVerifyBack';
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
// import { useTelegram } from "../src/context/TelegramProvider";
import VerifyNotCompleted from './pages/VerifyNotCompleted';
import VerifyFaied from './pages/VerifyFailed';
import useTelegram from './useTelegram';
import { Provider } from 'react-redux';
import {store} from './app/store'; // Adjust the path as necessary

export const OtpContext = createContext<{ username?: string }>({});

function App() {
  const [username, setUsername] = useState<string>("imhuman1");
  // const { user } = useTelegram();
  const tg = useTelegram();


  useEffect(() => {
      if (tg) {
          tg?.ready();
          console.log("tg???", tg.initDataUnsafe)
          const user  = tg?.initDataUnsafe.user;
          console.log("user>>>", user)
          setUsername(user?.username || "imhuman1");
          console.log('Username:', user?.username);
      }
  }, [tg]);


  return (
    <Provider store={store}>
      <OtpContext.Provider value={{ username }}>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomeBoard />} />
            <Route path="/verifysuccess" element={<VerifySuccess />} />
            <Route path="/linkverify" element={<LinkVerify />} />
            <Route path="/linkverifyback" element={<LinkVerifyBack />} />
            <Route path="/verifynotcompleted" element={<VerifyNotCompleted />} />
            <Route path="/verifyfailed" element={<VerifyFaied />} />
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
      </OtpContext.Provider>
    </Provider>
  )
}

export default App
