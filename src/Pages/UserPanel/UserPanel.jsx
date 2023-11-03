import Header from "../../components/Header/Header";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";
import Navbar from "../../components/Navbar/Navbar";
import UserPanelSidebar from "../../components/UserPanel/UserPanelSidebar/UserPanelSidebar";
import { Outlet } from "react-router";

function UserPanel() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col md:flex-row ps-5 py-3">
        <div className="w-full md:w-3/12 p-3 border border-white border-solid border-l-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200">
          <UserPanelSidebar />
        </div>
        <div className="w-full md:w-9/12 py-5 ps-0 md:ps-10 pe-5">
          <Outlet />
        </div>
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </>
  );
}

export default UserPanel;
