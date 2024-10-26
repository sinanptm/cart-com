import { useState } from "react";
import { useGetProducts } from "../lib/hooks/useGetProducts";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { products } = useGetProducts({ searchTerm, page, pageSize });
  

  return (
    <div>
      {products.map((product, i) => (
        <div key={i}>
          <h2>{product.name}</h2>
          <img src={product.image_url} alt={product.name} />
          <p>{product.slug}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;