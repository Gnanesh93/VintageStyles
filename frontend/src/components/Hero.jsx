import {useState,useRef} from "react";
import {assets} from "../assets/assets";

const Hero = ()=>{
  const images = [assets.slider1,assets.slider2,assets.slider3,assets.slider4,assets.slider5,assets.slider6,];
  const [current,setCurrent] = useState(0);
  const touchStartX = useRef(null);

  const nextSlide = ()=>{
    setCurrent((prev)=>{
      if (prev === images.length - 1){
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = ()=>{
    setCurrent((prev)=>{
      if (prev === 0){
        return images.length - 1;
      }
      return prev - 1;
    });
  };

  //for mobile view
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if(touchStartX.current === null){
      return
    };
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();

    touchStartX.current = null;
  };

  return (
    <div className="relative w-full z-0">
      <div className="relative overflow-hidden h-[250px] sm:h-[500px] lg:h-[600px]"
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

        {images.map((src,index)=>{
          const offset = index - current;

          return (
            <img key={index} src={src} alt={`Slide ${index}`}
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ease-in-out"
              style={{transform: `translateX(${offset * 100}%)`,opacity: offset === 0 ? 1 : 0,zIndex: offset === 0 ? 10 : 0,}}
            />
          );
        })}

        <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <button onClick={prevSlide} 
        className="absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 flex items-center justify-center
          bg-white/80 hover:bg-white rounded-full shadow-md backdrop-blur-sm text-2xl font-bold z-30">{"\u276E"}
      </button>

      <button onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 flex items-center justify-center
          bg-white/80 hover:bg-white rounded-full shadow-md backdrop-blur-sm text-2xl font-bold z-30">{"\u276F"}
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)} 
            className={`w-3 h-3 rounded-full ${current === index ? "bg-black" : "bg-gray-400"}`} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
