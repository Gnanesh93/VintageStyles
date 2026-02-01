const ProductDescription = ({product})=>{
  return (
    <div className="border rounded-lg px-6 py-8 text-sm text-gray-700 bg-white">
      <h2 className="text-lg font-semibold mb-4">Product Description</h2>

      <p className="leading-relaxed">
        <strong>{product.name}</strong> is thoughtfully designed to deliver comfort, durability, and style for everyday use. Crafted using
        premium-quality materials, this product is built to withstand regular wear while maintaining its original look and feel.
      </p>

      <p className="mt-4 leading-relaxed">
        Whether you are heading out for a casual day or using it as part of your daily routine, this product blends functionality with modern aesthetics.
        The attention to detail in its design ensures a refined appearance that complements a wide range of outfits and occasions.
      </p>

      <h3 className="mt-6 font-semibold text-gray-800">Key Highlights</h3>

      <ul className="list-disc list-inside mt-3 space-y-2">
        <li>Premium-quality material for long-lasting use</li>
        <li>Comfort-focused design suitable for extended wear</li>
        <li>Modern styling that fits both casual and semi-formal looks</li>
        <li>Carefully finished details for a refined appearance</li>
        <li>Designed to meet everyday lifestyle needs</li>
      </ul>

      <h3 className="mt-6 font-semibold text-gray-800">Usage & Care</h3>

      <p className="mt-3 leading-relaxed">
        To maintain the quality and longevity of <strong>{product.name}</strong>,
        it is recommended to follow standard care practices. Store the product in a clean and dry place when not in use. Avoid prolonged exposure to
        moisture or direct heat to preserve its finish and durability.
      </p>

      <p className="mt-4 leading-relaxed">
        Each unit undergoes a quality inspection before packaging to ensure it meets our standards of comfort, reliability, and design excellence.
        Choose <strong>{product.name}</strong> for a balance of style, comfort, and dependable performance.
      </p>
    </div>
  );
};

export default ProductDescription;
