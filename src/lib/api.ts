import axios from 'axios';
import { GetProducts, GetProductsQuery } from '../types/api.types';
import { Product } from '../types';


const axiosInstance = axios.create({
    baseURL: "https://smile-cart-backend-staging.neetodeployapp.com"
});


export const getProducts = async ({page, pageSize, searchTerm}:GetProductsQuery): Promise<GetProducts> => {
    const response = await axiosInstance.get(`/products?search_term=${searchTerm}&page=${page}&page_size=${pageSize}`);
    return response.data;
}

export const getProduct = async (slug: string): Promise<Product> => {
    const response = await axiosInstance.get(`/products/${slug}`);
    return response.data;
}