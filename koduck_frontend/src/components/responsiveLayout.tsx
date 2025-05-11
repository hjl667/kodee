import { breakpoints, isMobile, useBreakpoint } from "@/hooks/breakpoint";
import { Divider, Drawer, Layout } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserArea from "./user-area";
import { Logo, LogoSmall } from "./logo";
import Navbar from "./nav-bar";
import { IconLayout } from "@arco-design/web-react/icon";
import { cn } from "@/utils/utils";

const Sider = Layout.Sider;
const Footer = Layout.Footer;
const Content = Layout.Content;

const collapsedWidth = 66;
const normalWidth = 250;

function MobileLayout() {
  const [open, setOpen] = useState(false);

  return (
    <Layout className="fixed top-0 left-0 right-0 bottom-0">
      <Content className="mt-8">
        <Outlet />
      </Content>
      <Footer className="flex flex-row justify-start h-20 box-border px-4">
        <div className="flex flex-row justify-start items-center h-full w-full">
          <div className="flex flex-row justify-start items-center h-full w-full">
            <UserArea className={""} setOpen={setOpen} />
          </div>
        </div>
        <Divider style={{ margin: "0px" }} />
      </Footer>
      <Drawer
        width={normalWidth}
        visible={open}
        placement="bottom"
        onCancel={() => setOpen(false)}
        maskClosable={true}
        title={<LogoSmall />}
        bodyStyle={{ padding: 10 }}
        footer={null}
      >
        <Navbar />
      </Drawer>
    </Layout>
  );
}

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);
  const breakpoint = useBreakpoint();

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const onHover = () => {
    if (collapsed) {
      setHovered(true);
      setSiderWidth(normalWidth);
    }
  };

  const onLeave = () => {
    if (collapsed) {
      setHovered(false);
      setSiderWidth(collapsedWidth);
    }
  };

  const shouldCollapse = () => {
    if (collapsed) {
      return !hovered;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (breakpoint <= breakpoints.md) {
      setCollapsed(true);
      setSiderWidth(collapsedWidth);
    }
  }, [breakpoint]);

  return (
    <Layout className="h-screen w-screen overflow-hidden">
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
            {shouldCollapse() ? (
              <div className="flex flex-row items-center justify-center w-full cursor-pointer">
                <LogoSmall />
              </div>
            ) : (
              <Logo />
            )}
            <div
              className={cn(
                "inline-block box-border p-2 cursor-pointer hover:bg-gray-200 rounded-md",
                shouldCollapse() ? "hidden" : "",
                collapsed ? "" : "bg-gray-100"
              )}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              <IconLayout className="text-2xl" />
            </div>
          </div>

          <Navbar />

          <UserArea className="hidden sm:block" setOpen={undefined} />
        </div>
      </Sider>

      <Layout className="h-screen w-screen overflow-hidden">
        <Content className="box-border p-2">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

function ResponsiveLayout() {
  const breakpoint = useBreakpoint();

  return isMobile(breakpoint) ? <MobileLayout /> : <AppLayout />;
}

export default ResponsiveLayout;
