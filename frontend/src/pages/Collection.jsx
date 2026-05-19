import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { useLocation } from 'react-router-dom'

const PRODUCTS_PER_PAGE = 20

const Collection = () => {

  const {
    products = [],
    loading,
    search,
    showSearch,
    setSubCategory: setGlobalSubCategory
  } = useContext(ShopContext)

  const location = useLocation()

  const [showFilter, setShowFilter] = useState(false)
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [design, setDesign] = useState([])
  const [sortType, setSortType] = useState('relavent')
  const [currentPage, setCurrentPage] = useState(1)
  const [bestsellerOnly, setBestsellerOnly] = useState(false)

  // URL → Context Sync
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlSubCategory = params.get('subCategory')

    if (urlSubCategory) {
      setSubCategory([urlSubCategory])
      setGlobalSubCategory(urlSubCategory)
    } else {
      setSubCategory([])
      setGlobalSubCategory("")
    }
  }, [location.search])

  const toggleCategory = (e) => {
    setCurrentPage(1)
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    setCurrentPage(1)
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const toggleDesign = (e) => {
    setCurrentPage(1)
    const value = e.target.value
    setDesign(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  // 🔥 DERIVED FILTERED PRODUCTS (NO STATE SYNC BUG)
  const filteredProducts = useMemo(() => {

    let result = [...products]

    if (showSearch && search) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      result = result.filter(item =>
        category.includes(item.category)
      )
    }

    if (subCategory.length > 0) {
      result = result.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    if (design.length > 0) {
      result = result.filter(item =>
        item.design && design.includes(item.design)
      )
    }
    
    if (bestsellerOnly) {
      result = result.filter(item => item.bestseller)
    }

    if (sortType === 'low-high') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      result.sort((a, b) => b.price - a.price)
    }

    return result

  }, [products, category, subCategory, design, search, showSearch, sortType])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  return (
    <div className="flex flex-col md:flex-row gap-10 pt-10 border-t border-gray-200 px-4 sm:px-10 lg:px-16 bg-[#edece8] min-h-screen relative">
      
      {/* MOBILE FIXED FILTER BUTTON */}


      {/* MOBILE FILTER OVERLAY / DRAWER */}
      <div className={`fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm transition-all duration-500 md:hidden ${showFilter ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`absolute bottom-0 left-0 w-full bg-[#edece8] rounded-t-[40px] p-8 transition-transform duration-500 ${showFilter ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-8"></div>
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-street text-black uppercase">Refine Drops</h2>
            <button onClick={() => setShowFilter(false)} className="text-brand-red font-bold uppercase tracking-widest text-xs">Close</button>
          </div>

          <div className="space-y-8 max-h-[60vh] overflow-y-auto pb-10">
            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Categories</h3>
              <div className="flex flex-wrap gap-3">
                {['Men', 'Women', 'Unisex'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => toggleCategory({target: {value: cat}})}
                    className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${category.includes(cat) ? 'bg-brand-red text-white' : 'bg-white text-black border border-gray-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* SubCategory Filter */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Collection Type</h3>
              <div className="flex flex-wrap gap-3">
                {['Oversized T-Shirts', 'Normal T-Shirts', 'Tank Tops', 'Hoodies'].map(sub => (
                  <button 
                    key={sub}
                    onClick={() => toggleSubCategory({target: {value: sub}})}
                    className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${subCategory.includes(sub) ? 'bg-brand-red text-white' : 'bg-white text-black border border-gray-200'}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Design Filter */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Designs</h3>
              <div className="flex flex-wrap gap-3">
                {['Anime', 'Words', 'Artists', 'Cars', 'Winters', 'Summers'].map(dsg => (
                  <button 
                    key={dsg}
                    onClick={() => toggleDesign({target: {value: dsg}})}
                    className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${design.includes(dsg) ? 'bg-brand-red text-white' : 'bg-white text-black border border-gray-200'}`}
                  >
                    {dsg}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowFilter(false)}
            className="w-full bg-black text-white py-5 font-bold tracking-[0.3em] uppercase shadow-[6px_6px_0px_0px_rgba(230,0,0,1)] mt-4"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* DESKTOP FILTER SIDEBAR */}
      <div className="hidden md:block w-64 flex-shrink-0 space-y-8">
          
          {/* Category Filter */}
          <div className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-black uppercase border-b border-gray-100 pb-3">Categories</h3>
            <div className="flex flex-col gap-3">
              {['Men', 'Women', 'Unisex'].map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-5 h-5 border-2 border-gray-200 checked:bg-brand-red checked:border-brand-red transition-all cursor-pointer"
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={toggleCategory}
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-black transition-colors uppercase tracking-wider">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-black uppercase border-b border-gray-100 pb-3">Collection Type</h3>
            <div className="flex flex-col gap-3">
              {['Oversized T-Shirts', 'Normal T-Shirts', 'Tank Tops', 'Hoodies'].map(sub => (
                <label key={sub} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-5 h-5 border-2 border-gray-200 checked:bg-brand-red checked:border-brand-red transition-all cursor-pointer"
                      value={sub}
                      checked={subCategory.includes(sub)}
                      onChange={toggleSubCategory}
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-black transition-colors uppercase tracking-wider">{sub}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Design Filter */}
          <div className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-black uppercase border-b border-gray-100 pb-3">Designs</h3>
            <div className="flex flex-col gap-3">
              {['Anime', 'Words', 'Artists', 'Cars', 'Winters', 'Summers'].map(dsg => (
                <label key={dsg} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-5 h-5 border-2 border-gray-200 checked:bg-brand-red checked:border-brand-red transition-all cursor-pointer"
                      value={dsg}
                      checked={design.includes(dsg)}
                      onChange={toggleDesign}
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-black transition-colors uppercase tracking-wider">{dsg}</span>
                </label>
              ))}
            </div>
          </div>

      </div>

      {/* PRODUCTS SECTION */}
      <div className="flex-1">

        {/* Top Header & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <Title text1="ALL" text2="DROPS" />
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowFilter(true)}
              className="md:hidden flex-1 bg-black text-white px-6 py-3 font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2"
            >
              <img src={assets.search_icon} className="w-3 invert" alt="" />
              REFINE
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:w-60">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 px-6 py-3 text-xs font-bold tracking-widest uppercase outline-none focus:border-black transition-all cursor-pointer pr-10"
              >
                <option value="relavent">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <img className="h-2 opacity-50" src={assets.dropdown_icon} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">

          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32 space-y-4">
              <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400">Loading Drops...</p>
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="col-span-full text-center py-32 border-2 border-dashed border-gray-200 bg-white/50">
              <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Zero matches found for your filter.</p>
              <button 
                onClick={() => {setCategory([]); setSubCategory([]); setDesign([])}}
                className="mt-4 text-xs font-bold text-brand-red underline uppercase tracking-widest"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            paginatedProducts.map(item => (
              <div key={item._id} className="animate-fade-in-up">
                <ProductItem
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  badge={item.badge}
                />
              </div>
            ))
          )}

        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-20 mb-20">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={`w-12 h-12 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'bg-black text-white shadow-[6px_6px_0px_0px_rgba(230,0,0,1)]'
                    : 'bg-white text-black border border-gray-200 hover:border-black'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Collection
