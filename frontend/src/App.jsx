import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import PageWrapper from './components/PageWrapper'
import SEO from './components/SEO'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'))
const Collection = lazy(() => import('./pages/Collection'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'))
const Orders = lazy(() => import('./pages/Orders'))
const Profile = lazy(() => import('./pages/Profile'))
const Verify = lazy(() => import('./pages/Verify'))
const Success = lazy(() => import('./pages/Success'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))

const App = () => {
  const location = useLocation();

  return (
    <div className='w-full overflow-x-hidden'>
      <SEO />
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<PageWrapper><Home /></PageWrapper>} />
            <Route path='/collection' element={<PageWrapper><Collection /></PageWrapper>} />
            <Route path='/about' element={<PageWrapper><About /></PageWrapper>} />
            <Route path='/contact' element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path='/product/:productId' element={<Product />} />
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
      </Suspense>
      <Footer />
    </div>
  )
}

export default App

