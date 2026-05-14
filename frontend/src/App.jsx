import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import Success from './pages/Success'
import VerifyEmail from './pages/VerifyEmail'
import { AnimatePresence } from 'framer-motion'
import PageWrapper from './components/PageWrapper'
import SEO from './components/SEO'

const App = () => {
  const location = useLocation();

  return (
    <div className='w-full overflow-x-hidden'>
      <SEO />
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<PageWrapper><Home /></PageWrapper>} />
          <Route path='/collection' element={<PageWrapper><Collection /></PageWrapper>} />
          <Route path='/about' element={<PageWrapper><About /></PageWrapper>} />
          <Route path='/contact' element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path='/product/:productId' element={<Product />} /> {/* Product page has its own motion and SEO */}
          <Route path='/cart' element={<PageWrapper><Cart /></PageWrapper>} />
          <Route path='/login' element={<PageWrapper><Login /></PageWrapper>} />
          <Route path='/place-order' element={<PageWrapper><PlaceOrder /></PageWrapper>} />
          <Route path='/orders' element={<PageWrapper><Orders /></PageWrapper>} />
          <Route path='/profile' element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path='/verify' element={<PageWrapper><Verify /></PageWrapper>} />
          <Route path='/order-success' element={<PageWrapper><Success /></PageWrapper>} />
          <Route path='/verify-email' element={<PageWrapper><VerifyEmail /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App

