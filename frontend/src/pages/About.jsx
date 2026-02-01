import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16 '>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Welcome to <b>Vintage Styles</b>, where timeless elegance meets today's trends.
            We bring back the charm of classic fashion with a modern twist.
            Every piece tells a story — crafted with care, designed to inspire, and made to last.
          </p>

          <p>
            At Vintage Styles, every piece begins with inspiration drawn from timeless fashion eras.
            Our design team carefully studies classic patterns and reimagines them with a modern touch.
            From fabric selection to stitching and finishing, each step is handled with precision and care.
            We partner with trusted artisans and sustainable suppliers to ensure that every product we deliver meets the highest quality standards.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission is to revive the timeless beauty of vintage fashion and make it a part of today's lifestyle.
            We believe that true style never fades — it evolves.
            Through thoughtful design, quality craftsmanship, and a passion for sustainability, we aim to connect the past with the present, one outfit at a time.
          </p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-4'>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            At Vintage Styles, quality isn't just a goal — it's our promise.
            Every piece we create undergoes strict quality checks to ensure durability, comfort, and flawless craftsmanship.
            From fabric selection to final stitching, our team ensures each product meets the highest standards before it reaches you.
          </p>
        </div>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Convinience:</b>
          <p className='text-gray-600'>
            We make shopping effortless and enjoyable.
            With easy navigation, secure payments, and fast delivery, finding your favorite vintage styles has never been simpler.
          </p>
        </div>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            We believe every customer deserves personal attention.
            Our dedicated support team is always ready to assist you - from inquiries to post-purchase care - ensuring a smooth and satisfying experience.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About;
