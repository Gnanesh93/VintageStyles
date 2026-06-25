import { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  const images = [
    assets.slider1,
    assets.slider2,
    assets.slider3,
    assets.slider4,
    assets.slider5,
    assets.slider6,
  ];
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => {
      if (prev === images.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrent((prev) => {
      if (prev === 0) {
        return images.length - 1;
      }
      return prev - 1;
    });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) {
      return;
    }

    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();

    touchStartX.current = null;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-3 lg:px-4 mt-3 z-0">
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg h-[180px] sm:h-[250px] md:h-[320px] lg:h-[390px] xl:h-[430px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, index) => {
          const offset = index - current;
          return (
            <img key={index} src={src} alt={`Slide ${index}`}
              className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01] transition-opacity duration-700"
              style={{
                opacity: offset === 0 ? 1 : 0,
                zIndex: offset === 0 ? 10 : 0,
              }}
            />
          );
        })}

        <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg text-2xl font-bold z-30"
      >
        {"\u276E"}
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg text-2xl font-bold z-30"
      >
        {"\u276F"}
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${current === index ? "bg-white scale-125" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
