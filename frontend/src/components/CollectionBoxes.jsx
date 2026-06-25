import {useNavigate} from "react-router-dom";
import {assets} from "../assets/assets";
import Title from "./Title";

const collections = [
  {
    label: "Sarees",
    image: assets.sarees,
    params: { category: "Women", productType: "Saree" },
  },
  {
    label: "Shirts",
    image: assets.shirts,
    params: { category: "Men", productType: "Shirt" },
  },
  {
    label: "Lehengas",
    image: assets.lehenga,
    params: { category: "Women", productType: "Lehenga" },
  },
  {
    label: "Children",
    image: assets.kids,
    params: { category: "Kids" },
  },
  {
    label: "Men Suits",
    image: assets.suits,
    params: { category: "Men", productType: "Suit" },
  },
  {
    label: "Sherwani",
    image: assets.sherwani,
    params: { category: "Men", productType: "Sherwani" },
  },
  {
    label: "Women Dresses",
    image: assets.dress,
    params: { category: "Women", productType: "Dress" },
  },
];

const CollectionBoxes = () => {
  const navigate = useNavigate();

  const handleClick = (params) => {
    const query = new URLSearchParams(params).toString();
    navigate(`/collection?${query}`);
  };

  return (
    <div className="w-full bg-white py-4">
      <div className="text-center pt-1 pb-2 text-2xl">
        <Title text1={"SHOP BY"} text2={"CATEGORY"} />
      </div>
      <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto px-3 scrollbar-hide sm:justify-center">
        {collections.map((col) => (
          <button
            key={col.label}
            onClick={() => handleClick(col.params)}
            className="flex-shrink-0 flex flex-col items-center group transition-all duration-300"
          >
            <div className="w-[90px] h-[90px] sm:w-[105px] sm:h-[105px] lg:w-[110px] lg:h-[110px] rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition duration-300">
              <img
                src={col.image}
                alt={col.label}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm mt-2 text-gray-800 font-medium text-center">
              {col.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollectionBoxes;
