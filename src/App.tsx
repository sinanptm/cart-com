import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoadingSpinner from "./components/Spinner";

const Cart = lazy(() => import("./components/Cart"));
const Home = lazy(() => import("./components/Home"));

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white antialiased">
        <NavBar />
        <main className="container mx-auto px-4 py-8 pt-14">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;