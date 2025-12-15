import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import {assets} from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts';
const Product = () => {
  const{productId}=useParams();
  const{products,currency,addToCart,token,navigate}=useContext(ShopContext);
  const[productData,setProductData]=useState(false);
  const[image,setImage]=useState("")
  const[size,setSize]=useState("")
  

  const fetchProductData = () => {
  const product = products.find(item => item._id === productId);
  if (product) {
    setProductData(product);
    setImage(product.image[0]);
    setSize(""); // reset when switching products
  }
};


  useEffect(() => {
  if (products.length > 0) {
    fetchProductData();
  }
}, [productId, products]);


  useEffect(() => {
  if (productData && productData.productType === 'Saree') {
    setSize('Free Size');
  }
  }, [productData]);


  return productData ? (
    <div className='border-t pt-10 transition-opacity esae-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll  justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="side images"/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto'/>
          </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray md:w-4/5'>{productData.description}</p>
          {productData.sizes.length > 0 && (
    <div className="flex flex-col gap-4 my-8">
      <p>Select Size</p>
      <div className="flex gap-2">
      {productData.productType === "Saree" ? (
        <button className="border py-2 px-4 bg-gray-100 border-orange-500" disabled >Free Size</button>)
        :
        ( productData.sizes.map((item, index) => (
          <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`}key={index}>{item}</button>
        ))
      )}
    </div>
  </div>
)}

          <button onClick={()=>token?addToCart(productData._id,size) : navigate('/login')} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash On delivery Available on this product.</p>
            <p>Easy Return and Exchange Policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description and reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p> The <strong>{productData.name}</strong> is crafted with premium quality materials for long-lasting comfort and durability. 
              Designed to keep up with your daily lifestyle, this product combines modern design with superior performance, 
              making it perfect for casual wear or active days.
          </p>
          <p>
            Each <strong>{productData.name}</strong> undergoes a thorough quality check before packaging. 
            Manufactured using sustainable processes, it ensures comfort, style, and reliability you can trust. 
            Pair it with your favorite accessories to complete your everyday look.
          </p>
        </div>
      </div>
      {/* related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}  productType={productData.productType} productId={productData._id} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product;
