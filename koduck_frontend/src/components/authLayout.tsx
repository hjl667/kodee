import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
