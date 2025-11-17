import React, { useContext, useState, useEffect } from 'react'
import { FaChevronRight, FaAngleDown } from "react-icons/fa";
import Title from '../Component/Title';
import { ShopDataContext } from '../Context/ShopContext';
import Card from '../Component/Card';
import Product from './Product';

function Collections() {
  let [showFilter, setShowFilter] = useState(false);
  let { products, search, showSearch } = useContext(ShopDataContext);
  console.log("Products from context:", products);

  let [filterProduct, setFilterProduct] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relavant");

  useEffect(() => {
    console.log("Products in context:", products);
  }, [products]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let fbCopy = filterProduct.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProduct(fbCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProduct(fbCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className={`w-[99vw] min-h-[100vh] bg-gradient-to-br from-[#FFFFFF] via-[#FAFAFA] to-[#F1F1F1] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-[2] pb-[110px]`}>
      
      {/* Sidebar Filter */}
      <div className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] p-[20px] border-r border-gray-300 text-[#333] lg:fixed ${showFilter ? "h-[75vh]" : "h-[8vh]"}`}>
        <p className='text-[25px] text-[#111] font-semibold flex gap-[5px] items-center cursor-pointer justify-start' onClick={() => setShowFilter(prev => !prev)}>
          Filters
          {!showFilter && <FaChevronRight className='text-[15px] md:hidden' />}
          {showFilter && <FaAngleDown className='text-[15px] md:hidden' />}
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded-md bg-[#FCFCFC] ${showFilter ? "" : 'hidden'} md:block`}>
          <p className='text-[18px] text-[#111] font-medium'>Categories</p>
          <div className='w-[230px] h-[120px] flex flex-col gap-[10px] mt-2'>
            <label className='flex items-center gap-[10px] text-[#222] text-[16px]'>
              <input type="checkbox" value={'Men'} onChange={toggleCategory} className='w-3' /> Men
            </label>
            <label className='flex items-center gap-[10px] text-[#222] text-[16px]'>
              <input type="checkbox" value={'Women'} onChange={toggleCategory} className='w-3' /> Women
            </label>
            <label className='flex items-center gap-[10px] text-[#222] text-[16px]'>
              <input type="checkbox" value={'Kids'} onChange={toggleCategory} className='w-3' /> Kids
            </label>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded-md bg-[#FCFCFC] ${showFilter ? "" : 'hidden'} md:block`}>
          <p className='text-[18px] text-[#111] font-medium'>Sub-Categories</p>
          <div className='w-[230px] h-[120px] flex flex-col gap-[10px] mt-2'>
            <label className='flex items-center gap-[10px] text-[#222] text-[16px]'>
              <input type="checkbox" value={'TopWear'} onChange={toggleSubCategory} className='w-3' /> Top-Wear
            </label>
            <label className='flex items-center gap-[10px] text-[#222] text-[16px]'>
              <input type="checkbox" value={'BottomWear'} onChange={toggleSubCategory} className='w-3' /> Bottom-Wear
            </label>
            <label className='flex items-center gap-[10px] text-[#222] text-[16px]'>
              <input type="checkbox" value={'WinterWear'} onChange={toggleSubCategory} className='w-3' /> Winter-Wear
            </label>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className='lg:pl-[20%] md:py-[10px]'>
        <div className='md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]'>
          <Title text1={"All "} text2={"Collections"} />
          <select className='bg-[#FCFCFC] w-[60%] md:w-[200px] h-[50px] px-[10px] text-[#222] rounded-lg border border-gray-300' onChange={(e) => setSortType(e.target.value)}>
            <option value="relavant">Sort by : Relevant</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px] text-[#222]'>
          {
            filterProduct && filterProduct.length > 0 ? (
              filterProduct.map((item, index) => (
                <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
              ))
            ) : (
              <p className="text-[#555] text-xl">No products found</p>
            )
          }
        </div>
      </div>

    </div>
  );
}

export default Collections;
