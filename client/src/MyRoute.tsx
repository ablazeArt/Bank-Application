import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransferComponents from "./components/Routes/Transfer/TransferComponents";
import HistoryComponents from "./components/Routes/History/HitstoryComponents";
import DepositComponents from "./components/Routes/Deposit/DepositComponents";
import WithdrawnComponents from "./components/Routes/Withdrawn/WithdrawnComponents";
import LoginComponent from "./components/Routes/Login/LoginComponent";

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/Login" element={<LoginComponent />} />
        <Route path="/account/:accountNumber" element={<App />} />
        <Route path="/account/:accountNumber/Deposit" element={<DepositComponents />} />
        <Route path="/account/:accountNumber/Withdrawn" element={<WithdrawnComponents />} />
        <Route path="/account/:accountNumber/Transfer" element={<TransferComponents />} />
        <Route path="/account/:accountNumber/History" element={<HistoryComponents />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
