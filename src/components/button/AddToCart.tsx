import { useCallback } from "react";
import { useCartContext } from "../../lib/hooks/useCartContext";
import { Product } from "../../types";

const AddToCart = ({ product }: { product: Product; }) => {
    const { setCart, setCount } = useCartContext();
    const handleClick = useCallback(() => {
        setCart((prev) => [...prev, product]);
        setCount((prev) => prev + 1);
    }, []);

    return (
        <button
            className="bg-blue-400 hover:bg-blue-500 px-3 border rounded-md "
            onClick={handleClick}
        >
            Add to Cart
        </button>
    );
};

export default AddToCart;