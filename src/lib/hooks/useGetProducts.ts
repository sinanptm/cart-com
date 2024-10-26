import { useCallback, useEffect, useState } from "react";
import { Product } from "../../types";
import { getProducts } from "../api";
import { GetProductsQuery } from "../../types/api.types";

export const useGetProducts = ({ page, pageSize, searchTerm }: GetProductsQuery) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProductsCount, setTotalProductsCount] = useState(0);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const products = await getProducts({ page, pageSize, searchTerm });
            setProducts(products.products);
            setTotalProductsCount(products.total_products_count);
        } catch (error: any) {
            setError(error.response.data.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }, [page, pageSize, searchTerm, getProducts]);

    useEffect(() => {
        fetchProducts();
    });

    return {
        isLoading,
        error,
        products,
        totalProductsCount
    };
};