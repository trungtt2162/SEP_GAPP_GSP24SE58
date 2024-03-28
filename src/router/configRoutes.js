import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./../theme";

import App from "./../App";
import { ToastContainer } from "react-toastify";
import Login from "./../components/Auth/Login";
import DashBoard from "./../components/Auth/DashBoard";
import Register from "./../components/Auth/Register";
import PageTree from "../page/family-tree/PageTree";
import HistoryFamily from "../page/history-family/HistoryFamily";
import Footer from "../components/layout/footer";
import PraviteLayout from "../layouts/PrivateLayout";
import Home from "../page/home/Home";
import PageTreeAdmin from "../page/family-tree/admin-family-tree/PageTreeAdmin";
import ManageAdmin from "../page/manage-admin/ManageAdmin";
import ManageMemberFund from "../page/funds/member-fund/MemberFund";
import ManageAdminFund from "../page/funds/admin-fund/AdminFund";
import ProfileManager from "../page/profile/ProfileManage";
import EventMember from "../page/member-event.jsx/EventMember";
import RequestEvents from "../page/request-event/RequestEvent";
import HomeNoLogin from "../page/home/HomeNologin";
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger" role="alert">
      404 - Not found data with your current URL
    </div>
  );
};
const ConfigRoutes = (props) => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<PraviteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home-nologin" element={<HomeNoLogin />} />


            <Route path="users" element={<></>} />
        
          <Route path="/pageTree" element={<PageTreeAdmin />}></Route>
          <Route path="/admin" element={<ManageAdmin />} />
          <Route path="/member-fund" element={<ManageMemberFund />} />
          <Route path="/admin-fund" element={<ManageAdminFund />} />
          <Route path="/profile" element={<ProfileManager />} />
          <Route path="/event" element={<EventMember />} />
          <Route path="/request-event" element={<RequestEvents />} />
          <Route path="/history" element={<HistoryFamily />}>
            
            
            
          </Route>
          <Route path="/quiz/:id" element={<></>} />
          <Route path="/admin1" element={<></>}>
         
          
            <Route path="" element={<></>} />
          </Route>
        
          <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* <Footer /> */}
      </ThemeProvider>
    </div>
  );
};
export default ConfigRoutes;