import { Box } from "@mui/material";
import { useState } from "react";
import Footer from "../components/Footer";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import Orders from "./Orders";

const UserDashboard = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <Box className="w-[90%] mx-auto my-5 shadow-md border rounded-lg border-gray-100">
        <section className="text-gray-600 body-font">
          <div className="px-5 py-3 text-xl font-semibold">
            <h2>Account Overview</h2>
          </div>
          <hr />
          <div className=" px-5 pt-5 pb-8 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 md:px-6 w-full mb-10 lg:mb-0 overflow-hidden lg:border-r">
              <div className="w-full">
                <ul
                  className="flex mb-0 list-none flex-wrap flex-row border-b"
                  role="tablist"
                >
                  <li className="-mb-px last:mr-0 flex-1 text-center">
                    <a
                      className={
                        " font-bold text-base px-5 py-3 block leading-normal " +
                        (openTab === 1
                          ? "text-brown-500 border rounded-t-sm border-b-2 border-gray-300 "
                          : "")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      Edit Profile
                    </a>
                  </li>
                  <li className="-mb-px last:mr-0 flex-1 text-center">
                    <a
                      className={
                        " font-bold text-base px-5 py-3 block leading-normal " +
                        (openTab === 2
                          ? "text-brown-500 border rounded-t-sm border-b-2 border-gray-300 "
                          : "")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      Change Password
                    </a>
                  </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                  <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">
                      <div
                        className={openTab === 1 ? "block" : "hidden"}
                        id="link1"
                      >
                        <div>
                          <EditProfile />
                        </div>
                      </div>
                      <div
                        className={openTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        <div className="space-y-6">
                          <ChangePassword />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-wrap lg:w-1/2 w-full md:px-6">
              <Orders />
            </div>
          </div>
        </section>
      </Box>
      <Footer />
    </>
  );
};

export default UserDashboard;
