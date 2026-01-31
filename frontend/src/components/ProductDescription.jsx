const ProductDescription = ({ product }) => {
  return (
    <div className="border px-6 py-6 text-sm text-gray-600">
      <p>
        <strong>{product.name}</strong> is crafted with premium quality materials
        for long-lasting comfort and durability.
      </p>
      <p className="mt-3">
        Designed to keep up with your daily lifestyle, it combines modern design
        with superior performance.
      </p>
    </div>
  );
};

export default ProductDescription;
