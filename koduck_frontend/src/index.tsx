import React, { useState, useEffect, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@arco-design/web-react/dist/css/arco.css";
import "./App.css";
import "./index.css";

import { AuthProvider } from "./providers/auth-provider";
import { TopicsProvider } from "./providers/topicsProvider";
import { SnackbarProvider } from "notistack";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./service/errorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";

const Create = lazy(() => import("./routes/create/create"));
const ResponsiveLayout = lazy(() => import("./components/responsiveLayout"));
const Repository = lazy(() => import("./routes/repository/repository"));
const Editor = lazy(() => import("./routes/editor/editor"));
const ErrorPage = lazy(() => import("./routes/errorPage"));
const AuthLayout = lazy(() => import("./components/authLayout"));
const LoginPage = lazy(() => import("./routes/auth/loginPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ResponsiveLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <Create />,
      },
      {
        path: "repository",
        element: <Repository />,
      },
      {
        path: "editor/:topicId",
        element: <Editor />,
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    element: (
      <Suspense>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <TopicsProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </TopicsProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            autoHideDuration={1000}
          />
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
