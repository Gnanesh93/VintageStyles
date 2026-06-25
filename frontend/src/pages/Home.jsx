import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import CollectionBoxes from '../components/CollectionBoxes'

const Home = () => {
  return (
    <div>
      <Hero />
      <CollectionBoxes />
      <LatestCollection />
      <BestSeller />
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home;
