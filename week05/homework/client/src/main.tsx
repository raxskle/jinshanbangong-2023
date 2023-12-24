import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DataView from "./views/DataView/DataView";
import TagsView from "./views/TagsView/TagsView";

import { Provider } from "react-redux";
import { store } from "./store/index";

import "./utils/i18n";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DataView />,
      },
      {
        path: "/tags",
        element: <TagsView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
