import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

function Collections() {
  const [showFilter, setShowFilter] = useState(false);

  const { products, search, showSearch } = useContext(shopDataContext);

  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // CATEGORY FILTER
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // SUB CATEGORY FILTER
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // APPLY FILTER
  const applyFilter = () => {
    let productCopy = [...products];

    // SEARCH
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    // SUB CATEGORY
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    setFilterProduct(productCopy);
  };

  // SORT PRODUCTS
  const sortProducts = () => {
    let fpCopy = [...filterProduct];

    switch (sortType) {
      case "low-high":
        setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  // FILTER EFFECT
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  // SORT EFFECT
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden pb-[110px]">
      {/* FILTER SECTION */}
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-full md:min-h-[100vh] ${
          showFilter ? "h-[45vh]" : "h-[8vh]"
        } p-[20px] border-r border-gray-400 text-[#aaf5fa] lg:fixed`}
      >
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          {!showFilter && <FaChevronRight className="text-[18px] md:hidden" />}
          {showFilter && <FaChevronDown className="text-[18px] md:hidden" />}
        </p>

        {/* CATEGORY */}
        <div
          className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-white">CATEGORIES</p>

          <div className="w-[230px] h-[120px] flex flex-col gap-[10px] justify-center">
            <label className="flex gap-[10px] items-center">
              <input
                type="checkbox"
                value="Men"
                className="w-3"
                onChange={toggleCategory}
              />
              Men
            </label>

            <label className="flex gap-[10px] items-center">
              <input
                type="checkbox"
                value="Women"
                className="w-3"
                onChange={toggleCategory}
              />
              Women
            </label>

            <label className="flex gap-[10px] items-center">
              <input
                type="checkbox"
                value="Kids"
                className="w-3"
                onChange={toggleCategory}
              />
              Kids
            </label>
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div
          className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-white">SUB-CATEGORIES</p>

          <div className="w-[230px] h-[120px] flex flex-col gap-[10px] justify-center">
            <label className="flex gap-[10px] items-center">
              <input
                type="checkbox"
                value="TopWear"
                className="w-3"
                onChange={toggleSubCategory}
              />
              TopWear
            </label>

            <label className="flex gap-[10px] items-center">
              <input
                type="checkbox"
                value="BottomWear"
                className="w-3"
                onChange={toggleSubCategory}
              />
              BottomWear
            </label>

            <label className="flex gap-[10px] items-center">
              <input
                type="checkbox"
                value="WinterWear"
                className="w-3"
                onChange={toggleSubCategory}
              />
              WinterWear
            </label>
          </div>
        </div>
      </div>

      {/* PRODUCT SECTION */}
      <div className="lg:pl-[20%] md:py-[10px]">
        <div className="md:w-[80vw] w-full flex justify-between flex-col lg:flex-row lg:px-[50px]">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            className="bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-white rounded-lg border-2 hover:border-[#46d1f7]"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* PRODUCTS */}
        <div className="lg:w-[80vw] md:w-[60vw] w-full min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]">
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className="text-white text-[20px] mt-10">No Products Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;
