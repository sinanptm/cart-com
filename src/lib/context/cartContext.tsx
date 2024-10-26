import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Product } from "../../types";

interface CartState {
    cart: Product[];
    count: number;
}

interface CartContextType extends CartState {
    setCart: Dispatch<SetStateAction<Product[]>>;
    setCount: Dispatch<SetStateAction<number>>;
}

const defaultState: CartState = { cart: [], count: 0 };
const persistedState: CartState = JSON.parse(localStorage.getItem("cart") || JSON.stringify(defaultState));

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>(persistedState.cart);
    const [count, setCount] = useState<number>(persistedState.count);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify({ cart, count }));
    }, [cart, count]);

    return (
        <CartContext.Provider value={{ cart, setCart, count, setCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
