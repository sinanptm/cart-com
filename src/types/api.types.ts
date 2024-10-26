import { Product } from ".";

export interface GetProducts {
    products: Product[];
    total_products_count: number;
}

export interface GetProductsQuery {
    page: number;
    searchTerm: string;
    pageSize:number;
}