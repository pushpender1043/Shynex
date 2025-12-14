import React, { createContext, useEffect, useState, useContext } from 'react';
import { AuthDataContext } from './AuthContext';
import axios from 'axios';
import { userDataContext } from './UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopDataContext = createContext();

function ShopContext({ children }) {
    let [products, setProducts] = useState([]);
    let { serverUrl } = useContext(AuthDataContext);
    let [search, setSearch] = useState('');
    let [cartItem, setCartItem] = useState({});
    let [showSearch, setShowSearch] = useState(false);
    let { userData } = useContext(userDataContext);
    
    // ✅ Navigate Feature Added
    const navigate = useNavigate();

    let currency = "₹";
    let delivery_fee = 40;

    // ✅ MODAL STATE (Quick View ke liye)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);

    // ✅ MODAL FUNCTIONS
    const openModal = (product) => {
        setModalProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalProduct(null);
    };

    const getProducts = async () => {
        try {
            let result = await axios.get(serverUrl + '/api/product/list');
            setProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }
        let cartData = structuredClone(cartItem);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItem(cartData);

        if (userData) {
            try {
                await axios.post(serverUrl + '/api/cart/add', { itemId, size }, { withCredentials: true });
                toast.success("Item Added to Cart");
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getUserCart = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true });
            setCartItem(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);
        if (userData) {
            try {
                await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        getProducts();
    }, [serverUrl]);

    useEffect(() => {
        if (userData) {
            getUserCart();
        } else {
            setCartItem({});
        }
    }, [userData, serverUrl]);

    let value = {
        products, currency, delivery_fee, getProducts,
        search, setSearch, showSearch, setShowSearch,
        cartItem, setCartItem, addToCart, updateQuantity,
        getCartCount, getCartAmount, navigate,
        // ✅ Modal Values Exported
        isModalOpen, setIsModalOpen,
        modalProduct, setModalProduct,
        openModal, closeModal
    };

    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    );
}

export default ShopContext;