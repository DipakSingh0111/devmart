import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import { API_MAP } from "../utils/apiData";
import Loading from "../components/Loading";

const LatestCollections = () => {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTshirts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_MAP.latest);
      setLatest(res?.data?.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTshirts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-16">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Latest Collection
      </h1>

      {/* 👇 Loading + Empty State */}
      {loading ? (
        <Loading />
      ) : latest.length === 0 ? (
        <h2 className="text-center text-gray-500">
          No Products Found
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {latest.map((item) => (
            <ProductList key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCollections;