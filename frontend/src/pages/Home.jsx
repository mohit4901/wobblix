import Hero from '../components/Hero'
import Categories from '../components/Categories'
import LatestCollection from '../components/LatestCollection'
import B4G1PromoSection from '../components/B4G1PromoSection'

import AboutSection from '../components/AboutSection'
import ContactPreview from '../components/ContactPreview'
import NewsletterBox from '../components/NewsletterBox'

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

      {/* About Us */}
      <AboutSection />

      {/* Contact Preview */}
      <ContactPreview />

      {/* Newsletter */}
      <NewsletterBox />

    </div>
  )
}

export default Home
