import { useCallback, useEffect, useState } from "react";
import { Product } from "../../types";
import { getProduct } from "../api";

export const useGetProduct =  (slug:string)=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [product, setProduct] = useState<Product>();

    const fetchProduct = useCallback(async()=>{
        setIsLoading(true);
        try {
            const product = await getProduct(slug);
            setProduct(product);
        } catch (error:any) {
            setError(error.message);
        }finally{
            setIsLoading(false);
        }
    },[slug,getProduct])

    useEffect(()=>{
        fetchProduct();
    },[fetchProduct]);

    return {
        isLoading,
        error,
        product
    }
}