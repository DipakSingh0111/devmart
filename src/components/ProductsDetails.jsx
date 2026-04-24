import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { API_MAP } from "../utils/apiData";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImg, setActiveImg] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isFav, setIsFav] = useState(false);

  const sizes = ["S", "M", "L", "XL"];
  const clothingCategories = ["mens-shirts", "womens-dresses", "tops"];

  /* Fetch Product */
  const getProduct = async () => {
    try {
      const res = await axios.get(`${API_MAP.singleProduct}/${id}`);
      setProduct(res.data);
      setActiveImg(res.data?.images?.[0]);
    } catch (err) {
      console.log(err);
    }
  };

  /* Related */
  const getRelatedProducts = async (category, currentId) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`,
      );
      const data = await res.json();

      const filtered = data.products.filter(
        (item) => item.id !== Number(currentId),
      );

      setRelated(filtered.slice(0, 8));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product?.category) {
      getRelatedProducts(product.category, id);
    }
  }, [product]);

  /* Cart */
  const addToCartHandler = () => {
    const cartObj = {
      price: product.price,
      title: product.title,
      image: product.thumbnail,
      qty,
      id: product.id,
    };
    dispatch(addToCart({ cartObj }));
  };

  const buyNowHandler = (e) => {
    e.stopPropagation();
    addToCartHandler();
    navigate("/cart");
  };

  if (!product) return <h1 className="text-center mt-10">Loading...</h1>;

  const originalPrice = Math.floor(product.price * 1.3);
  const discount = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 mt-16">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        Home / {product.category} /{" "}
        <span className="text-black font-medium">{product.title}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT IMAGE SECTION */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product?.images?.slice(0, 5).map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition ${
                  activeImg === img
                    ? "border-black scale-105"
                    : "border-gray-200 hover:border-black"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded-xl p-6 flex items-center justify-center relative">
            <img
              src={activeImg}
              alt={product.title}
              className="h-[380px] object-contain"
            />

            {/* Wishlist */}
            <button
              onClick={() => setIsFav(!isFav)}
              className="absolute top-4 right-4 text-2xl bg-white p-2 rounded-full shadow"
            >
              {isFav ? "❤️" : "🤍"}
            </button>
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="sticky top-20 h-fit">
          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
              {product.rating} ★
            </span>
            <span className="text-gray-500 text-sm">(120 reviews)</span>
          </div>

          {/* PRICE */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-black">
              ₹{product.price}
            </span>
            <span className="text-gray-400 line-through">₹{originalPrice}</span>
            <span className="text-green-600 font-semibold">
              {discount}% OFF
            </span>
          </div>

          {/* STOCK */}
          <p className="text-green-600 text-sm mt-1 font-medium">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* SIZE */}
          {clothingCategories.includes(product.category) && (
            <div className="mt-6">
              <p className="font-medium mb-2">Select Size</p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-full border transition ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="mt-6">
            <p className="font-medium mb-2">Quantity</p>
            <div className="flex items-center border w-fit rounded-lg overflow-hidden">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-6">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={addToCartHandler}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg w-full transition"
            >
              Add to Cart
            </button>

            <button
              onClick={buyNowHandler}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg w-full transition"
            >
              Buy Now
            </button>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <p>✔ 7 Days Easy Return</p>
            <p>✔ Cash on Delivery Available</p>
            <p>✔ Free Delivery on orders above ₹499</p>
          </div>
        </div>
      </div>

      {/* RELATED */}
      <h2 className="text-2xl font-bold mt-14 mb-6">Related Products 🔥</h2>

      {related.length === 0 ? (
        <p className="text-center text-gray-500">No related products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((item) => (
            <ProductList key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
