import Hero from '../components/Hero'
import Categories from '../components/Categories'
import LatestCollection from '../components/LatestCollection'
import B4G1PromoSection from '../components/B4G1PromoSection'
import OversizedCollection from '../components/OversizedCollection'
import HoodieCollection from '../components/HoodieCollection'
import TrousersCollection from '../components/TrousersCollection'

import AboutSection from '../components/AboutSection'
import ContactPreview from '../components/ContactPreview'


const Home = () => {
  return (
    <div className="w-full overflow-hidden">

      {/* Hero Section */}
      <Hero />

      {/* Categories */}
      <Categories />


      {/* Our Products */}
      <LatestCollection />

      {/* B4G1 Promo Section */}
      <B4G1PromoSection />

      {/* Oversized Drops */}
      <OversizedCollection />

      {/* Hoodie Season */}
      <HoodieCollection />

      {/* Trouser Drops */}
      <TrousersCollection />

      {/* About Us */}
      <AboutSection />

      {/* Contact Preview */}
      <ContactPreview />

     

    </div>
  )
}

export default Home
