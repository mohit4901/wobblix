import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { products as localProducts } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "₹";

  const SHIPPING_CHARGES = {
    india: 100
  };

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(false);
  const [shippingRegion, setShippingRegion] = useState("india");

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const navigate = useNavigate();
  const delivery_fee = SHIPPING_CHARGES[shippingRegion];

  // BACKEND WARMUP

  useEffect(() => {
    if (backendUrl) {
      fetch(backendUrl + "/").catch(() => {});
    }
  }, [backendUrl]);

  // PRODUCTS FETCH

  const getProductsData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        backendUrl + "/api/product/list",
        { params: { category, subCategory } }
      );

      if (res.data.success) {
        setProducts(res.data.products || []);
      } else {
        setProducts([]);
      }

    } catch (error) {
      console.log("Fetch failed, fallback to local");
      setProducts(localProducts || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (backendUrl) {
      getProductsData();
    }
  }, [category, subCategory, backendUrl]);

  // CART LOGIC

  const addToCart = async (itemId, size) => {

    if (!token) {
      toast.error("Please login to add items to cart");
      navigate('/login');
      return;
    }

    const product = products.find(p => p._id === itemId);

    if (product?.sizes?.length > 0 && !size) {
      toast.error("Select Product Size");
      return;
    }

    const finalSize = product?.sizes?.length > 0 ? size : "default";

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][finalSize]) {

        const existing = cartData[itemId][finalSize];

        if (typeof existing === "number") {
          cartData[itemId][finalSize] = {
            quantity: existing + 1,
            instruction: ""
          };
        } else {
          cartData[itemId][finalSize].quantity += 1;
        }

      } else {
        cartData[itemId][finalSize] = {
          quantity: 1,
          instruction: ""
        };
      }
    } else {
      cartData[itemId] = {
        [finalSize]: {
          quantity: 1,
          instruction: ""
        }
      };
    }

    setCartItems(cartData);

    if (token) {
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId, size: finalSize },
        { headers: { token } }
      );
    }
  };

  // UPDATE QUANTITY

  const updateQuantity = async (itemId, size, quantity, instruction = "") => {

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) cartData[itemId] = {};

    const existing = cartData[itemId][size];

    if (typeof existing === "number") {
      cartData[itemId][size] = {
        quantity,
        instruction
      };
    } else {
      cartData[itemId][size] = {
        quantity,
        instruction
      };
    }

    setCartItems(cartData);

    if (token) {
      await axios.post(
        backendUrl + "/api/cart/update",
        { itemId, size, quantity },
        { headers: { token } }
      );
    }
  };

  // COUNT

  const getCartCount = () => {
    let total = 0;
    for (const i in cartItems) {
      for (const s in cartItems[i]) {
        const item = cartItems[i][s];
        total += typeof item === "number" ? item : item.quantity;
      }
    }
    return total;
  };

  // AMOUNT

  const getCartAmount = () => {
    let total = 0;

    for (const id in cartItems) {
      const product = products.find(p => p._id === id);
      if (!product) continue;

      for (const s in cartItems[id]) {
        const item = cartItems[id][s];
        const qty = typeof item === "number" ? item : item.quantity;
        total += product.price * qty;
      }
    }

    return total;
  };

  // USER DATA

  const getUserCart = async (token) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserProfile = async (token) => {
    try {
      const res = await axios.get(backendUrl + "/api/user/profile", {
        headers: { token }
      });
      if (res.data.success) {
        setUserData(res.data.user);
      } else {
        setToken("");
        localStorage.removeItem("token");
        toast.error(res.data.message || "Session expired. Please login again.");
      }
    } catch (error) {
      console.log(error);
      setToken("");
      localStorage.removeItem("token");
      toast.error("Failed to load profile. Please login again.");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
      loadUserProfile(savedToken);
    }
  }, []);

  const value = {
    products,
    loading,
    currency,
    delivery_fee,
    shippingRegion,
    setShippingRegion,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    userData,
    setUserData,
    loadUserProfile,
    category,
    setCategory,
    subCategory,
    setSubCategory
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
