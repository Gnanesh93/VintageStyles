import {useState,useRef} from "react";
import {assets} from "../assets/assets";

const Hero = () => {
  const images = [assets.slider1,assets.slider2,assets.slider3,assets.slider4,assets.slider5,assets.slider6,];

  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  // NEXT SLIDE
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // PREVIOUS SLIDE
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // TOUCH START (MOBILE)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // TOUCH END (MOBILE)
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;

  // swipe left → show previous
    if (diff > 50) prevSlide();
  // swipe right → show next
    if (diff < -50) nextSlide();    

    touchStartX.current = null;
  };

  return (
    <div className="relative w-full overflow-hidden z-0">
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {images.map((src, index) => (
        <img key={index} src={src} className=" w-full h-[250px] object-contain sm:h-[500px] lg:h-[600px] sm:object-cover flex-shrink-0" alt={`Slide ${index}`}/>
      ))}
      </div>

      {/* Left Arrow */}
      <button onClick={prevSlide} className="absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md backdrop-blur-sm text-2xl font-bold">❮</button>
      {/* Right Arrow */}
      <button onClick={nextSlide} className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md backdrop-blur-sm text-2xl font-bold">❯</button>
      {/* Bottom Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)} className={`w-3 h-3 rounded-full ${current === index ? "bg-black" : "bg-gray-400"}`}></button>
        ))}
      </div>
    </div>
  );
}

export default Hero;

