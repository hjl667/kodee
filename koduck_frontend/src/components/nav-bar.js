import React from "react";

import { useNavigate } from "react-router";

import { Menu } from "@arco-design/web-react";
import {
  IconPlus,
  IconCloud,
  IconArrowRight,
  IconPlayCircle,
} from "@arco-design/web-react/icon";

const MenuItem = Menu.Item;

const NavigationList = [
  {
    name: "Create Speech",
    icon: <IconPlus className="text-base"/>,
    path: "/",
  },
  {
    name: "Repository",
    icon: <IconCloud className="text-base"/>,
    path: "/repository",
  },
  {
    name: "Console",
    icon: <IconPlayCircle className="text-base"/>,
    path: "/console",
  },
]

function getNavigationNameOnPath(path) {
  if (path === "/playground") {
    return "Playground";
  } else {
    return NavigationList.find((item) => item.path === path)?.name;
  }
}

function Navbar () {
  const navigate = useNavigate();

  return (
    <Menu className="grow" defaultSelectedKeys={["/"]}>
      {NavigationList.map((item) => (
        <MenuItem key={item.path} onClick={() => {
          navigate(item.path);
        }}>
          {item.icon}
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default Navbar;

export {
  getNavigationNameOnPath
}
