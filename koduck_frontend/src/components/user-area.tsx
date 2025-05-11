import React, { useContext } from "react";

import { Button, Menu } from "@arco-design/web-react";
import { IconLaunch, IconList, IconUser } from "@arco-design/web-react/icon";

import { useNavigate, useLocation } from "react-router-dom";
import { useBreakpoint, isMobile, breakpoints } from "../hooks/breakpoint";
import { AuthContext } from "../providers/auth-provider";

const MenuItem = Menu.Item;

const UserArea = ({ className, setOpen }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    window.location.reload();
  };

  const openUserGuide = () => {
    window.open("https://github.com/hjl667/kodee", "_blank");
  };

  return isMobile(breakpoint) ? (
    <div className="fixed bottom-0 left-0 right-0 flex flex-row justify-center items-center w-full bg-white border-t border-gray-200 py-3 px-4 space-x-4 z-10">
      <Button onClick={handleLoginClick}>
        <IconUser className="text-lg z-20" />
      </Button>
      <Button onClick={openUserGuide}>
        <IconLaunch className="text-lg" />
      </Button>
      <Button onClick={setOpen}>
        <IconList className="text-lg" />
      </Button>
    </div>
  ) : (
    <Menu className={className} mode={"vertical"}>
      <MenuItem onClick={openUserGuide}>
        <IconLaunch className="text-base" />
        User Guide
      </MenuItem>
      {!isLoggedIn() ? (
        <MenuItem onClick={handleLoginClick}>
          <IconUser className="text-lg" />
          Log In
        </MenuItem>
      ) : (
        <MenuItem onClick={handleLogoutClick}>
          <IconUser className="text-lg" />
          Log Out
        </MenuItem>
      )}
    </Menu>
  );
};

export default UserArea;
