import {useContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import {assets} from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const location = useLocation();

  const [showFilter,setShowFilter] = useState(false)
  const [filterProducts,setFilterProducts] = useState([]);

  const [category,setCategory] = useState([])
  const [subCategory,setSubCategory] = useState([])
  const [productType,setProductType] = useState([])

  const [sortType,setSortType] = useState('relevant')

  const {products,search,showSearch} = useContext(ShopContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const catParam = params.get('category');
    const subCatParam = params.get('subCategory');
    const typeParam = params.get('productType');

    if (catParam) setCategory([catParam]);
    else setCategory([]);

    if (subCatParam) setSubCategory([subCatParam]);
    else setSubCategory([]);

    if (typeParam) setProductType([typeParam]);
    else setProductType([]);

  }, [location.search]);


  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } 
    else {
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } 
    else {
      setSubCategory(prev => [...prev,e.target.value])
    }
  }


  const applyFilter = () => {
    let productsCopy = products.slice();

    if(category.length > 0){
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

    if(productType.length > 0){
      productsCopy = productsCopy.filter(item =>
        productType.includes(item.productType)
      );
    }

    if (showSearch && search) {
      const searchTerm = search.toLowerCase().trim();

      productsCopy = productsCopy.filter(item => {
        const name = item.name.toLowerCase();
        const category = item.category.toLowerCase();
        const subCategory = item.subCategory.toLowerCase();
        const normalize = (text) => text.replace(/s$/, '').replace(/-/g, '');

        return (
          normalize(name).includes(normalize(searchTerm)) ||
          normalize(category) === normalize(searchTerm) ||
          normalize(subCategory) === normalize(searchTerm)
        );
      });
    }

    setFilterProducts(productsCopy);
  }


  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }


  useEffect(()=>{
    applyFilter();
  },[products,category,subCategory,productType,search,showSearch]);

  useEffect(()=>{
    sortProduct();
  },[sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      <div className='min-w-60'>

        <p onClick={()=>setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90":""}`}
            src={assets.dropdown_icon} alt=""/>
        </p>

        <div className={`border border-gray-300 pl-5 my-3 mt-6 ${showFilter? "":'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' value="Men"
                checked={category.includes("Men")}
                onChange={toggleCategory}/> Men
            </p>

            <p className='flex gap-2'>
              <input type='checkbox' value="Women"
                checked={category.includes("Women")}
                onChange={toggleCategory}/> Women
            </p>

            <p className='flex gap-2'>
              <input type='checkbox' value="Kids"
                checked={category.includes("Kids")}
                onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 my-3 ${showFilter? "":'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' value="Topwear"
                checked={subCategory.includes("Topwear")}
                onChange={toggleSubCategory}/> Topwear
            </p>

            <p className='flex gap-2'>
              <input type='checkbox' value="Bottomwear"
                checked={subCategory.includes("Bottomwear")}
                onChange={toggleSubCategory}/> Bottomwear
            </p>

            <p className='flex gap-2'>
              <input type='checkbox' value="Winterwear"
                checked={subCategory.includes("Winterwear")}
                onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>

      </div>

      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          <select onChange={(e)=>setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'>

            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item,index)=>(
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>

      </div>

    </div>
  )
}

export default Collection;