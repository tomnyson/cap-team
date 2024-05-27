import { Button } from "components/button";
import React from "react";
import { Link } from "react-router-dom";
import DashboardFund from "./DashboardFund";
import DashboardSearch from "./DashboardSearch";
import { handleAuthLogOut } from "store/auth/auth-handlers";
import { useDispatch, useSelector } from "react-redux";
import { authLogOut } from "store/auth/auth-slice";

const DashboardTopbar = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ DashboardTopbar ~ user:", user);
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center flex-1 gap-x-10">
        <Link to="/" className="inline-block">
          <img srcSet="/logo.png 2x" alt="crowfunding-app" />
        </Link>
        {/* <div className=" max-w-[458px] w-full">
          <DashboardSearch></DashboardSearch>
        </div> */}
      </div>
      <div className="flex items-center justify-end flex-1 gap-x-10">
        {user && user?.role?.name === "ADMIN" ? (
          <Button
            className="px-7"
            type="button"
            href="/start-campaign"
            kind="secondary"
          >
            Start a personal
          </Button>
        ) : (
          <></>
        )}
        <div className="flex items-center gap-3">
          {!user && !user?.fullname ? (
            <>
              {" "}
              <Button
                className="px-7"
                type="button"
                href="/login"
                kind="primary"
              >
                Login
              </Button>
              <Button
                className="px-7"
                type="button"
                href="/register"
                kind="ghost"
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <div className="px-4 py-1 bg-secondary bg-opacity-10 text-secondary rounded-lg">
                {user.fullname}
              </div>
              <img
                srcSet="/logo.png 2x"
                alt="crowfunding-app"
                className="object-cover rounded-full"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTopbar;
