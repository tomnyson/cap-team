import {
  IconCampaign,
  IconDarkmode,
  IconDashboard,
  IconLogout,
  IconPayment,
  IconProfile,
  IconWithdraw,
} from "components/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authLogOut } from "store/auth/auth-slice";
const sidebarLinks = [
  {
    icon: <IconDashboard></IconDashboard>,
    title: "Dashboard",
    url: "/",
    role: ["HR", "PAYROLL", "ADMIN"],
  },
  {
    icon: <IconCampaign></IconCampaign>,
    title: "Campaign",
    url: "/campaign",
    role: ["ADMIN"],
  },
  {
    icon: <IconPayment></IconPayment>,
    title: "Payment",
    url: "/payment",
    role: ["HR", "PAYROLL", "ADMIN"],
  },
  {
    icon: <IconWithdraw></IconWithdraw>,
    title: "Withdraw",
    url: "/withdraw",
    role: ["PAYROLL"],
  },
  {
    icon: <IconProfile></IconProfile>,
    title: "Profile",
    url: "/profile",
    role: ["HR"],
  },
  {
    icon: <IconLogout></IconLogout>,
    title: "Logout",
    url: "/logout",
    role: ["HR", "PAYROLL", "ADMIN"],
  },
  {
    icon: <IconDarkmode></IconDarkmode>,
    title: "Light/Dark",
    url: "/#",
    onClick: () => {},
    role: ["HR", "PAYROLL", "ADMIN"],
  },
];
const DashboardSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const navlinkClass =
    "flex items-center gap-x-5 md:w-12 md:h-12 md:justify-center md:rounded-lg md:mb-8  last:mt-auto last:bg-white last:shadow-sdprimary";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authLogOut());
    navigate("/login");
  };
  return (
    <div className="w-full md:w-[76px] rounded-3xl bg-white shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] px-[14px] py-10 flex flex-col flex-shrink-0">
      {sidebarLinks.map((link) => {
        if (link.url === "/logout") {
          return (
            <button
              onClick={() => handleLogout()}
              className={navlinkClass}
              key={link.title}
            >
              <span>{link.icon}</span>
              <span className="md:hidden">{link.title}</span>
            </button>
          );
        }
        if (user && !link.role.includes(user?.role?.name)) return <></>;
        return (
          <NavLink
            to={link.url}
            key={link.title}
            className={({ isActive }) =>
              isActive
                ? `${navlinkClass} text-primary bg-primary bg-opacity-20`
                : `${navlinkClass} text-icon-color`
            }
          >
            <span>{link.icon}</span>
            <span className="md:hidden">{link.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default DashboardSidebar;
