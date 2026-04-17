import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductList from "../pages/ProductList";
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

  // Clothing categories
  const clothingCategories = ["mens-shirts", "womens-dresses", "tops"];

  // Get single product
  const getProduct = async () => {
    try {
      const res = await axios.get(`${API_MAP.singleProduct}/${id}`);
      const data = res.data;

      setProduct(data);
      setActiveImg(data?.images?.[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // AddTOCart handler
  const addToCartHandler = () =>{
    const cartObj = {
      price: product.price,
      title: product.title,
      image: product.thumbnail,
      qty,
      description: product.description,
      id: product.id,
    };
    dispatch(addToCart({cartObj}));
  }

  // Buy now handler
  const buyNowhandler = (e) =>{
    e.stopPropagation();
    addToCartHandler();
    navigate("/cart");

  }

  // Get related products
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
    } catch (error) {
      console.log(error);
    }
  };

  // Load product
  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // Load related
  useEffect(() => {
    if (product?.category) {
      getRelatedProducts(product.category, id);
    }
  }, [product]);

  if (!product) return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-16">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        Home / Products / {product.category} /{" "}
        <span className="text-indigo-500">{product.title}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {/* LEFT IMAGE */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product?.images?.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer ${
                  activeImg === img ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex-1 border rounded-xl p-4 flex items-center justify-center bg-gray-50">
            <img
              src={activeImg}
              alt={product.title}
              className="h-[350px] object-contain"
            />
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div>
          {/* Title + Fav */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <button onClick={() => setIsFav(!isFav)} className="text-2xl">
              {isFav ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-500 text-lg">
                {i < Math.round(product.rating) ? "★" : "☆"}
              </span>
            ))}
            <span className="ml-2 text-gray-500">({product.rating})</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-green-600 mt-4">
            ₹{product.price}
          </p>

          {/* Stock */}
          <p className="mt-2 text-sm text-green-600 font-medium">
            {product.stock > 0 ? "In Stock ✅" : "Out of Stock ❌"}
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* SIZE (only clothing) */}
          {clothingCategories.includes(product.category) && (
            <div className="mt-6">
              <p className="font-medium mb-2">Select Size:</p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size ? "bg-black text-white" : "bg-white"
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
            <p className="font-medium mb-2">Quantity:</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>

              <span className="text-lg">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button onClick={addToCartHandler} className="bg-yellow-500 cursor-pointer text-white px-6 py-3 rounded-lg w-full">
              Add to Cart
            </button>

            <button onClick={buyNowhandler} className="bg-orange-500 cursor-pointer text-white px-6 py-3 rounded-lg w-full">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <h2 className="text-2xl font-bold mt-12 mb-5">Related Products 🔥</h2>

      {related.length === 0 ? (
        <p className="text-center text-gray-500">No related products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {related.map((item) => (
            <ProductList key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
