import { useParams } from "react-router-dom";
import Product from "./Product";

const ProductWrapper =()=> {
  const { productId } = useParams();
  return <Product key={productId} />;
};

export default ProductWrapper;
