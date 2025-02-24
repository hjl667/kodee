import React, {useState, useEffect} from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  Navigate
} from "react-router-dom";

import "@arco-design/web-react/dist/css/arco.css";
import "./App.css";
import "./index.css";

import { Button, Drawer, Layout, Divider } from "@arco-design/web-react";
import {
  IconList,
  IconLayout,
} from "@arco-design/web-react/icon";

import Playground from "./routes/Playground/playground";
import Create from "./routes/Create/create"
import MarkdownDisplay from "./routes/Feedback/feedback";
import { AuthProvider } from './providers/auth-provider';
import UserArea from './components/user-area'
import LoginPage from './routes/Auth/LoginPage'
import AuthLayout from './components/AuthLayout';
import Repository from "./routes/Repository/repository";
import Console from "./routes/console/console";
import { SnackbarProvider } from 'notistack';
import { Logo, LogoSmall } from "./components/logo";
import { cn, isLogin } from "./utils";
import Navbar, { getNavigationNameOnPath } from "./components/nav-bar";
import { useBreakpoint, isMobile, breakpoints } from "./hooks/breakpoint";

const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;

const collapsedWidth = 66;
const normalWidth = 250;

function MobileLayout() {
  const [open, setOpen] = useState(false);
  const path = useLocation().pathname;

  return (
    <Layout className="fixed top-0 left-0 right-0 bottom-0">
      <Header className="h-16 box-border px-4">
        <div className="flex flex-row justify-between items-center h-full w-full">
          <div className="grow text-2xl font-semibold w-full">
            {getNavigationNameOnPath(path)}
          </div>

          <div className="flex flex-row justify-end items-center h-full w-full">
            <UserArea/>
            <div className="w-2"></div>
            <Button onClick={() => setOpen(true)} shape="circle" type="dashed">
              <IconList/>
            </Button>
          </div>
        </div>
        <Divider style={{margin: "0px"}}/>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Drawer
        width={normalWidth}
        visible={open}
        placement="left"
        onCancel={() => setOpen(false)}
        maskClosable={true}
        title={<LogoSmall/>}
        bodyStyle={{padding: 0}}
        footer={null}
      >
        <Navbar />
      </Drawer>
    </Layout>
  )
}

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);
  const breakpoint = useBreakpoint();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const onHover = () => {
    if (collapsed) {
      setHovered(true);
      setSiderWidth(normalWidth);
    }
  }

  const onLeave = () => {
    if (collapsed) {
      setHovered(false);
      setSiderWidth(collapsedWidth);
    }
  }

  const shouldCollapse = () => {
    if (collapsed) {
      return !hovered;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (breakpoint <= breakpoints.md) {
      setCollapsed(true);
      setSiderWidth(collapsedWidth);
    }
  }, [breakpoint]);

  return (
    <Layout className="h-dvh w-screen">
      <Sider
        className="h-full"
        breakpoint="sm"
        onCollapse={onCollapse}
        collapsed={shouldCollapse()}
        width={siderWidth}
        collapsedWidth={collapsedWidth}
      >
        <div
          className="flex flex-col h-full px-2"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          <div className="flex flex-row justify-between items-center px-2 py-4">
            {
              shouldCollapse()
              ? <div className="flex flex-row items-center justify-center w-full cursor-pointer">
                  <LogoSmall />
                </div>
              : <Logo />
            }
            <div
              className={cn(
                "inline-block box-border p-2 cursor-pointer hover:bg-gray-200 rounded-md",
                shouldCollapse() ? "hidden" : "",
                collapsed ? "" : "bg-gray-100",
              )}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              <IconLayout className="text-2xl"/>
            </div>
          </div>

          <Navbar />

          <UserArea className="hidden sm:block"/>
        </div>
      </Sider>

      <Layout className="relative">
        <Content className=" box-border p-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

function ResponsiveLayout() {
  const breakpoint = useBreakpoint();

  return (
    isMobile(breakpoint)
    ? <MobileLayout />
    : <AppLayout />
  )
}

const router = createBrowserRouter([
  {
    element: <ResponsiveLayout />,
    children: [
      {
          path: "/",
          element: <Create />,
      },
      {
          path: "playground/:speechId",
          element: <Playground />,
      },
      {
          path: "feedback/:practiceId",
          element: <MarkdownDisplay />,
      },
      {
          path: "repository",
          element: <Repository />,
      },
      {
        path: "console",
        element: <Console />,
      },
      // {
      //     path: "detail",
      //     element: <TopicDetail/>
      // }
    ],
  },
  {
    element: <AuthLayout />,  // Use AuthLayout for auth-related routes
    children: [
      {
        path: "login",
        element: isLogin() ? <Navigate to="/" replace /> : <LoginPage />, // 登陆之后不可再跳转近登陆页面
      },
      // Add other auth-related routes here, like SignUpPage
    ],
  },
]);

const App = () => {
  const [userId, setUserId] = useState(null);

  return (
      <>
        <AuthProvider value={{ userId, setUserId }}>
          <RouterProvider router={router} />
        </AuthProvider>
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={1000}
        />
      </>

  );
};

createRoot(document.getElementById("root")).render(<App />);
