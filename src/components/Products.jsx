import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_MAP } from "../utils/apiData";

import Pagination from "../components/Pagination";
import ProductList from "./ProductList";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 8;
  const gridRef = useRef(null);

  const handleProducts = async () => {
    const response = await axios.get(`${API_MAP.home}`);
    setProduct(response.data.products);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  const paginated = product.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="py-6 px-3 sm:px-5 md:px-8">
      <h1 className="text-2xl sm:text-3xl text-center font-bold mt-3">
        Our Products
      </h1>

      <div className="max-w-7xl mx-auto mt-6">
        <div
          ref={gridRef}
          className="
        grid 
        grid-cols-2 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        gap-4 sm:gap-5 md:gap-6
      "
        >
          {paginated.map((items) => (
            <div key={items.id} className="w-full">
              <ProductList data={items} />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(product.length / perPage)}
            totalItems={product.length}
            perPage={perPage}
            onPageChange={(p) => {
              setPage(p);
              gridRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
