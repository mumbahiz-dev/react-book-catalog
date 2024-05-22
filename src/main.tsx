import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Book from "./components/Book.tsx";
import Navbar from "./components/Navbar.tsx";
import Author from "./components/Author.tsx";
import BookCreate from "./components/BookCreate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/books",
    element: (
      <Navbar>
        <Book />
      </Navbar>
    ),
  },
  {
    path: "/author",
    element: (
      <Navbar>
        <Author />
      </Navbar>
    ),
  },
  {
    path: "book/create",
    element: (
      <Navbar>
        <BookCreate />
      </Navbar>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
