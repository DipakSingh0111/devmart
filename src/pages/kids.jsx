import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import { API_MAP } from "../utils/apiData";
import Loading from "../components/Loading";

const Kids = () => {
  const [kidsData, setKidsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getKidsProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_MAP.kids);
      setKidsData(res?.data?.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKidsProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-16">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Kids Collection
      </h1>

      {/* 👇 Loading Spinner */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {kidsData.map((item) => (
            <ProductList key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Kids;