import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { useGetProducts } from "../lib/hooks/useGetProducts";
import AddToCart from "./button/AddToCart";
import LoadingSpinner from "./Spinner";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const pageSize = 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('query') || '');
  const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  const { products, isLoading, totalProductsCount } = useGetProducts({ searchTerm, page, pageSize });

  const totalPages = useMemo(() => Math.ceil(totalProductsCount / pageSize), [totalProductsCount, pageSize]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 

    return () => clearTimeout(handler); 
  }, [searchTerm]);

  useEffect(() => {
    setSearchParams({ query: debouncedSearchTerm, page: page.toString() });
  }, [debouncedSearchTerm, page, setSearchParams]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
  }, [setSearchParams]);

  const handleSearchInput = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearchInput(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          />
        </div>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-y-11 gap-x-4 lg:gap-x-16 md:gap-x-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-svh w-screen">
            <LoadingSpinner />
          </div>
        ) : (
          products.map(({ image_url, name, offer_price, mrp, available_quantity, slug }, i) => (
            <article
              key={slug + i}
              className="group bg-gray-900 rounded-xl border mx-1 border-gray-700 hover:border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative p-3 aspect-square">
                <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={image_url}
                    alt={name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="p-3 space-y-2 border-t border-gray-700">
                <h4 className="text-sm font-light text-gray-200 line-clamp-2 min-h-[2.5rem]">
                  {name}
                </h4>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold text-white">
                      ₹{offer_price.toLocaleString()}
                    </span>
                    {mrp > offer_price && (
                      <span className="text-xs text-green-400 ">
                        {Math.round((1 - offer_price / mrp) * 100)}% off
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-1">
                  {available_quantity > 0 ? (
                    <span className="text-xs text-green-400">
                      {available_quantity} in stock
                    </span>
                  ) : (
                    <span className="text-xs text-red-400">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>

              <div
                className="flex items-center justify-center pb-5"
              >
                <AddToCart />
              </div>

            </article>
          ))
        )}
      </section>

      <div className="mt-8 flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            disabled={i + 1 === page}
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className="p-3 rounded-lg text-sm bg-blue-400 hover:bg-blue-500  border border-red-50 text-emerald-950 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
};

export default memo(Home);
