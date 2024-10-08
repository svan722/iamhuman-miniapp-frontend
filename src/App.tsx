import "./App.css";
import { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomeBoard from "./pages/WelcomeBoard";
import VerifySuccess from "./pages/VerifySuccess";
import LinkVerify from "./pages/LinkVerify";
import LinkVerifyBack from "./pages/LinkVerifyBack";
import ProfileVerify from "./pages/ProfileVerify";
import PendingProfile from "./pages/PendingProfile";
import HelloHuman from "./pages/HelloHuman";
import EditProfile from "./pages/EditProfile";
import ViewProfile from "./pages/ViewProfile";
import VerifyPassed from "./pages/VerifyPassed";
import UpgradePremium from "./pages/UpgradePremium";
import Payment from "./pages/Payment";
import AccountUpgraded from "./pages/AccountUpgraded";
import SelectVerification from "./pages/SelectVerification";
import IndividualVerification from "./pages/IndividualVerification";
import IndividualActivePortal from "./pages/IndividualActivePortal";
// import { useTelegram } from "../src/context/TelegramProvider";
import VerifyNotCompleted from "./pages/VerifyNotCompleted";
import VerifyFailed from "./pages/VerifyFailed";
import OtherTgVerifyFailed from "./pages/OtherTgVerifyFailed";
import OtherTgVerifyNotCompleted from "./pages/OtherTgVerifyNotCompleted";
import NoMatchVerifyNotCompleted from "./pages/NoMatchVerifyNotCompleted";
import NoMatchVerifyFailed from "./pages/NoMatchVerifyFailed";
import GroupCertification from "./pages/GroupCertification";
import useTelegram from "./useTelegram";
// import { Provider } from "react-redux";
// import { store } from "./app/store"; // Adjust the path as necessary
import EditVerifyFailed from "./pages/EditVerifyFailed";
import EditVerifyNotCompleted from "./pages/EditVerifyNotCompleted";
import EditLinkVerifyBack from "./pages/EditLinkVerifyBack";
import UpcomingFeatures from "./pages/UpcomingFeatures";
import { useAppDispatch } from "./app/hooks";
import { setTgUserId } from "./actions/TgUserAction";

export const OtpContext = createContext<{ username?: string }>({});

function App() {
  const [username, setUsername] = useState<string>("imhuman1");
  // const { user } = useTelegram();
  const tg = useTelegram();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tg) {
      tg?.ready();
      console.log("tg???", tg.initDataUnsafe);
      const user = tg?.initDataUnsafe.user;
      console.log("user>>>", user);
      setUsername(user?.username || "imhuman1");
      console.log("Username:", user?.username);
      dispatch(setTgUserId(user?.username));
    }
  }, [tg]);

  return (
    // <Provider store={store}>
      <OtpContext.Provider value={{ username }}>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomeBoard />} />
            <Route path="/verifysuccess" element={<VerifySuccess />} />
            <Route path="/linkverify" element={<LinkVerify />} />
            <Route path="/profileverify" element={<ProfileVerify />} />
            <Route path="/pendingprofile" element={<PendingProfile />} />
            <Route path="/linkverifyback" element={<LinkVerifyBack />} />
            <Route
              path="/verifynotcompleted"
              element={<VerifyNotCompleted />}
            />
            <Route path="/verifyfailed" element={<VerifyFailed />} />
            <Route path="/othertgverifynotcompleted" element={<OtherTgVerifyNotCompleted />} />
            <Route path="/othertgverifyfailed" element={<OtherTgVerifyFailed />} />
            <Route path="/nomatchverifynotcompleted" element={<NoMatchVerifyNotCompleted />} />
            <Route path="/nomatchverifyfailed" element={<NoMatchVerifyFailed />} />
            <Route path="/hellohuman" element={<HelloHuman />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/editverifyfailed" element={<EditVerifyFailed />} />
            <Route
              path="/editverifynotcompleted"
              element={<EditVerifyNotCompleted />}
            />
            <Route
              path="/editlinkverifyback"
              element={<EditLinkVerifyBack />}
            />
            <Route path="/viewprofile" element={<ViewProfile />} />
            <Route path="/verifypassed" element={<VerifyPassed />} />
            <Route path="/upgrade_premium" element={<UpgradePremium />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/account_upgraded" element={<AccountUpgraded />} />
            <Route
              path="/select_verification"
              element={<SelectVerification />}
            />
            <Route
              path="/individual_verification"
              element={<IndividualVerification />}
            />
            <Route
              path="/individual_active_portal"
              element={<IndividualActivePortal />}
            />
            <Route path="/group_certification" element={<GroupCertification />} />
            <Route path="/upcoming_features" element={<UpcomingFeatures />} />
          </Routes>
        </Router>
      </OtpContext.Provider>
    // </Provider>
  );
}

export default App;
