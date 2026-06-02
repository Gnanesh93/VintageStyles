import {useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({_id,image,name,price}) => {
    const {currency} = useContext(ShopContext);

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${_id}`}>
            <div className="w-full h-48 overflow-hidden rounded-md bg-gray-100 flex justify-center items-center">
                <img src={image[0]} alt={name} className="w-full h-full object-cover hover:scale-110 transition ease-in-out" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency} {price}</p>
        </Link>
    )
}

export default ProductItem;
