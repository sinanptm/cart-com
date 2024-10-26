import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import NavBar from "./components/NavBar";

const Cart = lazy(() => import("./components/Cart"));
const Home = lazy(() => import("./components/Home"));

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/cart", element: <Cart /> },
    { path: "/home", element: <Home /> }
  ]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;