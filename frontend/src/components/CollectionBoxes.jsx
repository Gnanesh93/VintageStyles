import {useNavigate} from 'react-router-dom';
import {assets} from '../assets/assets';

const collections = [
  {
    label: 'Sarees',
    image: assets.sarees,
    params: {category: 'Women', subCategory: 'Sarees'}
  },
  {
    label: 'Shirts',
    image: assets.shirts,
    params: {category: 'Men', subCategory: 'Topwear'}
  },
  {
    label: 'Lehengas',
    image: assets.lehenga,
    params: {category: 'Women', subCategory: 'Lehengas'}
  },
  {
    label: 'Children',
    image: assets.kids,
    params: {category: 'Kids'}
  },
  {
    label: 'Men Suits',
    image: assets.suits,
    params: {category: 'Men', subCategory: 'Suits'}
  },
  {
    label: 'Sherwani',
    image: assets.sherwani,
    params: {category: 'Men', subCategory: 'Sherwani'}
  },
  {
    label: 'Women Dresses',
    image: assets.dress,
    params: {category: 'Women', subCategory: 'Bottomwear'}
  }
];

const CollectionBoxes = () => {
  const navigate = useNavigate();

  const handleClick = (params) => {
    const query = new URLSearchParams(params).toString();
    navigate(`/collection?${query}`);
  };

  return (
    <div className="w-full py-3 pb-4 border-b border-gray-200 bg-white">
      
      <div className="flex gap-3 overflow-x-auto px-2 scrollbar-hide sm:justify-center">

        {collections.map((col) => (
          <button key={col.label} onClick={() => handleClick(col.params)}
            className="flex-shrink-0 flex flex-col items-center group" >
            
            <div className="w-[85px] h-[85px] sm:w-[110px] sm:h-[110px] rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition duration-300">
              <img src={col.image} alt={col.label} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs sm:text-sm mt-2 text-gray-700 font-medium text-center">
              {col.label}
            </p>

          </button>
        ))}

      </div>
    </div>
  );
};

export default CollectionBoxes;