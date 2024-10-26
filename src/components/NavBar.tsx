import { memo } from "react";
import { useCartContext } from "../lib/hooks/useCartContext";

const NavBar = () => {
  const { count: cartItemCount } = useCartContext();
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-cyan-200 tracking-tight">
            Simple Cart
          </h1>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <button className="relative">
            <img src="/assets/cart.svg" className="h-5 w-ss" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-1 flex h-4 bg-black bg-opacity-45 w-4 items-center justify-center rounded-full border text-xs font-medium text-white">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Shopping cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default memo(NavBar);